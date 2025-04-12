import requests
from datetime import datetime
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.colors import HexColor
import os
import json
import logging
from transformers import pipeline

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Define reports directory
REPORTS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'reports')
if not os.path.exists(REPORTS_DIR):
    os.makedirs(REPORTS_DIR)
    logger.info(f"Created reports directory at {REPORTS_DIR}")

# Initialize the summarization pipeline
try:
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    logger.info("Successfully loaded summarization model")
except Exception as e:
    logger.error(f"Error loading summarization model: {str(e)}")
    summarizer = None

class EventReportGenerator:
    def __init__(self, org_data):
        self.org_data = org_data
        self.org_name = org_data.get("orgName", "Unnamed Organization")
        self.vision = org_data.get("vision", "No vision statement provided.")
        self.mission = org_data.get("mission", "No mission statement provided.")
        self.events = org_data.get("events", [])
        # Define colors
        self.primary_color = HexColor('#2C3E50')  # Dark blue
        self.accent_color = HexColor('#3498DB')   # Light blue
        self.text_color = HexColor('#2C3E50')     # Dark blue for text

    def generate_ai_summary(self, text):
        """Generate an AI summary of the text"""
        if not summarizer:
            return "AI summary generation is not available."
        
        try:
            # Truncate text to fit model's maximum input length
            max_length = 1024
            if len(text) > max_length:
                text = text[:max_length]
            
            summary = summarizer(text, max_length=130, min_length=30, do_sample=False)
            return summary[0]['summary_text']
        except Exception as e:
            logger.error(f"Error generating AI summary: {str(e)}")
            return "Error generating AI summary."

    def generate_event_summary(self, submissions):
        """Generate a summary of event submissions using AI"""
        if not submissions:
            return "No submissions available for this event."

        valid_submissions = [s for s in submissions if s.get("report")]
        if not valid_submissions:
            return "No detailed reports available for this event."

        # Combine all reports into one text
        combined_text = " ".join([s.get("report", "") for s in valid_submissions])
        
        # Generate AI summary
        ai_summary = self.generate_ai_summary(combined_text)
        
        # Add basic statistics
        summary = f"This event has {len(valid_submissions)} submissions from employees.\n\n"
        summary += f"AI-Generated Summary:\n{ai_summary}"
        
        return summary

    def safe_date_format(self, date_str):
        try:
            dt = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
            return dt.strftime('%B %d, %Y')
        except Exception:
            return "Unknown date"

    def save_event_report(self, event, filename=None):
        """Generate a PDF report for a single event"""
        try:
            if filename is None:
                safe_name = "".join(c if c.isalnum() else "_" for c in event.get("eventName", "UnnamedEvent"))
                filename = f"{safe_name}_report.pdf"
            
            # Ensure filename is in the reports directory
            filepath = os.path.join(REPORTS_DIR, filename)
            
            logger.info(f"Generating report: {filepath}")
            
            doc = SimpleDocTemplate(filepath, pagesize=letter)
            styles = getSampleStyleSheet()
            story = []

            # Custom styles
            styles.add(ParagraphStyle(
                name='CustomTitle',
                parent=styles['Heading1'],
                fontSize=24,
                spaceAfter=30,
                textColor=self.primary_color,
                alignment=1  # Center alignment
            ))
            styles.add(ParagraphStyle(
                name='CustomHeading',
                parent=styles['Heading2'],
                fontSize=18,
                spaceAfter=12,
                textColor=self.accent_color,
                spaceBefore=20
            ))
            styles.add(ParagraphStyle(
                name='CustomBody',
                parent=styles['Normal'],
                fontSize=11,
                spaceAfter=8,
                textColor=self.text_color,
                leading=14
            ))
            styles.add(ParagraphStyle(
                name='CustomSubtitle',
                parent=styles['Normal'],
                fontSize=14,
                spaceAfter=20,
                textColor=self.primary_color,
                alignment=1
            ))

            # Organization Info
            story.append(Paragraph(self.org_name, styles['CustomTitle']))
            story.append(Paragraph("Corporate Social Responsibility Report", styles['CustomSubtitle']))
            story.append(Spacer(1, 20))

            # Vision and Mission
            story.append(Paragraph("Organization Overview", styles['CustomHeading']))
            story.append(Paragraph(f"<b>Vision:</b> {self.vision}", styles['CustomBody']))
            story.append(Paragraph(f"<b>Mission:</b> {self.mission}", styles['CustomBody']))
            story.append(Spacer(1, 20))

            # Event Info
            story.append(Paragraph("Event Details", styles['CustomHeading']))
            event_data = [
                ["Event Name:", Paragraph(event.get("eventName", "Unnamed Event"), styles['CustomBody'])],
                ["Date:", self.safe_date_format(event.get("eventDate", ""))],
                ["Location:", Paragraph(event.get("eventLocation", "Unknown Location"), styles['CustomBody'])],
                ["Reward Amount:", f"${event.get('rewardAmount', 0)}"]
            ]

            table = Table(event_data, colWidths=[1.5 * inch, 4 * inch])
            table.setStyle(TableStyle([
                ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
                ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
                ('FONTSIZE', (0, 0), (-1, -1), 11),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
                ('TOPPADDING', (0, 0), (-1, -1), 8),
                ('GRID', (0, 0), (-1, -1), 1, self.accent_color),
                ('BACKGROUND', (0, 0), (0, -1), HexColor('#F5F5F5')),
            ]))
            story.append(table)
            story.append(Spacer(1, 15))

            # Description
            description = event.get("eventDescription", "No description provided.")
            story.append(Paragraph("<b>Description:</b>", styles['CustomBody']))
            story.append(Paragraph(description, styles['CustomBody']))
            story.append(Spacer(1, 15))

            # Event Summary with AI
            story.append(Paragraph("AI-Generated Event Summary", styles['CustomHeading']))
            event_summary = self.generate_event_summary(event.get('submissions', []))
            story.append(Paragraph(event_summary, styles['CustomBody']))
            story.append(Spacer(1, 15))

            # Employee Submissions
            story.append(Paragraph("Employee Reports", styles['CustomHeading']))
            valid_submissions = [s for s in event.get('submissions', []) if s.get("employeeName") and s.get("report")]

            if valid_submissions:
                for submission in valid_submissions:
                    employee_name = submission.get('employeeName', 'Unnamed Employee')
                    report = submission.get('report', 'No report provided.')
                    story.append(Paragraph(f"<b>{employee_name}</b>", styles['CustomBody']))
                    story.append(Paragraph(report, styles['CustomBody']))
                    story.append(Spacer(1, 12))
            else:
                story.append(Paragraph("No detailed employee reports available for this event.", styles['CustomBody']))

            story.append(Spacer(1, 20))

            # Add footer with timestamp
            story.append(Paragraph(
                f"Generated on {datetime.now().strftime('%B %d, %Y at %I:%M %p')}",
                ParagraphStyle(
                    name='Footer',
                    parent=styles['Normal'],
                    fontSize=8,
                    textColor=HexColor('#666666'),
                    alignment=1
                )
            ))

            # Build the PDF
            doc.build(story)
            logger.info(f"Successfully generated report: {filepath}")
            return filepath
        except Exception as e:
            logger.error(f"Error generating report: {str(e)}")
            raise

    def generate_all_reports(self):
        """Generate reports for all events"""
        report_files = []
        for event in self.events:
            try:
                safe_name = "".join(c if c.isalnum() else "_" for c in event.get("eventName", "UnnamedEvent"))
                filename = f"{safe_name}_report.pdf"
                report_file = self.save_event_report(event, filename)
                report_files.append(os.path.basename(report_file))
                logger.info(f"Generated report for {event.get('eventName', 'Unnamed Event')}: {report_file}")
            except Exception as e:
                logger.error(f"Error generating report for event {event.get('eventName', 'Unnamed Event')}: {str(e)}")
        return report_files

# Fetch data
def fetch_org_data(org_id):
    """Fetch organization data from the MongoDB server"""
    url = f"http://localhost:5000/api/admin/{org_id}/"
    try:
        logger.info(f"Fetching organization data from: {url}")
        response = requests.get(url)
        logger.info(f"Response status code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            logger.info(f"Successfully fetched organization data")
            return data
        else:
            logger.error(f"Error fetching data: {response.status_code}")
            logger.error(f"Response content: {response.text}")
            return None
    except Exception as e:
        logger.error(f"Request failed: {str(e)}")
        return None

if __name__ == "__main__":
    org_id = "67f97a70406569c0972224ac"
    org_data = fetch_org_data(org_id)

    if org_data:
        generator = EventReportGenerator(org_data)
        report_files = generator.generate_all_reports()
        logger.info(f"\nGenerated {len(report_files)} event reports:")
        for file in report_files:
            logger.info(f"- {file}")
    else:
        logger.error("Failed to fetch organization data.") 