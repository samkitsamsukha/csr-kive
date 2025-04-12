import requests
from datetime import datetime
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
from reportlab.lib.colors import Color, HexColor
from transformers import pipeline
import os

# Load the summarization model
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

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

    def generate_event_summary(self, submissions):
        if not submissions:
            return "No submissions available for this event."

        valid_submissions = [s for s in submissions if s.get("report")]
        if not valid_submissions:
            return "No detailed reports available for this event."

        submission_texts = [
            f"{s.get('employeeName', 'Unnamed Employee')} reported: {s['report']}"
            for s in valid_submissions
        ]
        combined_text = " ".join(submission_texts)

        try:
            summary = summarizer(combined_text, max_length=500, min_length=200, do_sample=False)
            return summary[0]['summary_text']
        except Exception as e:
            return f"Error summarizing reports: {str(e)}"

    def safe_date_format(self, date_str):
        try:
            dt = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
            return dt.strftime('%B %d, %Y')
        except Exception:
            return "Unknown date"

    def add_image(self, story, image_path, width=6*inch, height=4*inch):
        """Add an image to the story with proper error handling"""
        try:
            if os.path.exists(image_path):
                img = Image(image_path, width=width, height=height)
                story.append(img)
                story.append(Spacer(1, 12))
            else:
                print(f"Warning: Image not found at {image_path}")
        except Exception as e:
            print(f"Error adding image {image_path}: {str(e)}")

    def save_event_report(self, event, filename=None):
        if filename is None:
            safe_name = "".join(c if c.isalnum() else "_" for c in event.get("eventName", "UnnamedEvent"))
            filename = f"{safe_name}_report.pdf"

        doc = SimpleDocTemplate(filename, pagesize=letter)
        styles = getSampleStyleSheet()
        story = []

        # Custom styles with improved typography
        styles.add(ParagraphStyle(
            name='CustomTitle',
            parent=styles['Heading1'],
            fontSize=28,
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

        # Organization Info with improved layout
        story.append(Paragraph(self.org_name, styles['CustomTitle']))
        story.append(Paragraph("Corporate Social Responsibility Report", styles['CustomSubtitle']))
        story.append(Spacer(1, 20))

        # Add images in a professional layout
        story.append(Paragraph("Event Highlights", styles['CustomHeading']))
        story.append(Spacer(1, 10))
        
        # Add both images side by side
        self.add_image(story, 'img1.jpg', width=3*inch, height=2*inch)
        self.add_image(story, 'img2.jpg', width=3*inch, height=2*inch)
        story.append(Spacer(1, 20))

        # Vision and Mission with improved styling
        story.append(Paragraph("Organization Overview", styles['CustomHeading']))
        story.append(Paragraph(f"<b>Vision:</b> {self.vision}", styles['CustomBody']))
        story.append(Paragraph(f"<b>Mission:</b> {self.mission}", styles['CustomBody']))
        story.append(Spacer(1, 20))

        # Event Info with improved table styling
        story.append(Paragraph("Event Details", styles['CustomHeading']))
        submissions = event.get('submissions', [])
        num_submissions = len([s for s in submissions if s.get("report")])

        event_data = [
            ["Event Name:", Paragraph(event.get("eventName", "Unnamed Event"), styles['CustomBody'])],
            ["Date:", self.safe_date_format(event.get("eventDate", ""))],
            ["Location:", Paragraph(event.get("eventLocation", "Unknown Location"), styles['CustomBody'])],
            ["Reward Amount:", f"${event.get('rewardAmount', 0)}"],
            ["Number of Reports:", f"{num_submissions} submission{'s' if num_submissions != 1 else ''}"]
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

        # Description with improved formatting
        description = event.get("eventDescription", "No description provided.")
        story.append(Paragraph("<b>Description:</b>", styles['CustomBody']))
        story.append(Paragraph(description, styles['CustomBody']))
        story.append(Spacer(1, 15))

        # Event Summary with improved styling
        story.append(Paragraph("Event Summary", styles['CustomHeading']))
        event_summary = self.generate_event_summary(event.get('submissions', []))
        story.append(Paragraph(event_summary, styles['CustomBody']))
        story.append(Spacer(1, 15))

        # Employee Submissions with improved layout
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

        doc.build(story)
        return filename

    def generate_all_reports(self):
        report_files = []
        for event in self.events:
            safe_name = "".join(c if c.isalnum() else "_" for c in event.get("eventName", "UnnamedEvent"))
            filename = f"{safe_name}_report.pdf"
            report_file = self.save_event_report(event, filename)
            report_files.append(report_file)
            print(f"Generated report for {event.get('eventName', 'Unnamed Event')}: {report_file}")
        return report_files

# Fetch data
def fetch_org_data(org_id):
    url = f"http://localhost:5000/api/admin/{org_id}/"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Error fetching data: {response.status_code}")
            return None
    except Exception as e:
        print(f"Request failed: {str(e)}")
        return None

if __name__ == "__main__":
    org_id = "67f97a70406569c0972224ac"
    org_data = fetch_org_data(org_id)

    if org_data:
        generator = EventReportGenerator(org_data)
        report_files = generator.generate_all_reports()
        print(f"\nGenerated {len(report_files)} event reports:")
        for file in report_files:
            print(f"- {file}")
    else:
        print("Failed to fetch organization data.")
