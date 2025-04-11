import requests
import json
from datetime import datetime
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
import os
from transformers import pipeline

# Load the summarization model
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

class EventReportGenerator:
    def __init__(self, org_data):
        self.org_data = org_data
        self.org_name = org_data["orgName"]
        self.vision = org_data["vision"]
        self.mission = org_data["mission"]
        self.events = org_data["events"]

    def generate_event_summary(self, submissions):
        if not submissions or len(submissions) == 0:
            return "No submissions available for this event."
        
        # Filter out submissions without reports
        valid_submissions = [s for s in submissions if "report" in s and s["report"]]
        
        if not valid_submissions:
            return "No detailed reports available for this event."
        
        # Generate event summary from submissions
        submission_texts = [f"{s['employeeName']} reported: {s['report']}" for s in valid_submissions]
        combined_text = " ".join(submission_texts)
        
        # Generate summary using BART
        summary = summarizer(combined_text, max_length=100, min_length=30, do_sample=False)
        return summary[0]['summary_text']

    def save_event_report(self, event, filename=None):
        if filename is None:
            # Create a filename based on the event name
            safe_name = "".join(c if c.isalnum() else "_" for c in event["eventName"])
            filename = f"{safe_name}_report.pdf"
        
        doc = SimpleDocTemplate(filename, pagesize=letter)
        styles = getSampleStyleSheet()
        story = []

        # Add custom styles
        styles.add(ParagraphStyle(
            name='CustomTitle',
            parent=styles['Heading1'],
            fontSize=24,
            spaceAfter=30
        ))
        styles.add(ParagraphStyle(
            name='CustomHeading',
            parent=styles['Heading2'],
            fontSize=16,
            spaceAfter=12
        ))
        styles.add(ParagraphStyle(
            name='CustomBody',
            parent=styles['Normal'],
            fontSize=11,
            spaceAfter=8
        ))

        # Organization Details
        story.append(Paragraph(self.org_name, styles['CustomTitle']))
        story.append(Paragraph(f"Vision: {self.vision}", styles['CustomBody']))
        story.append(Paragraph(f"Mission: {self.mission}", styles['CustomBody']))
        story.append(Spacer(1, 20))

        # Event Details
        story.append(Paragraph("Event Details", styles['CustomHeading']))
        
        # Event basic info
        event_data = [
            ["Event Name:", event['eventName']],
            ["Date:", datetime.fromisoformat(event['eventDate'].replace('Z', '+00:00')).strftime('%B %d, %Y')],
            ["Location:", event['eventLocation']],
            ["Description:", event['eventDescription']],
            ["Reward Amount:", f"${event['rewardAmount']}"]
        ]
        
        t = Table(event_data, colWidths=[1.5*inch, 4*inch])
        t.setStyle(TableStyle([
            ('ALIGN', (0,0), (-1,-1), 'LEFT'),
            ('FONTNAME', (0,0), (0,-1), 'Helvetica-Bold'),
            ('FONTNAME', (1,0), (1,-1), 'Helvetica'),
            ('FONTSIZE', (0,0), (-1,-1), 11),
            ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ]))
        story.append(t)
        story.append(Spacer(1, 12))

        # Event Summary
        story.append(Paragraph("Event Summary", styles['CustomHeading']))
        event_summary = self.generate_event_summary(event['submissions'])
        story.append(Paragraph(event_summary, styles['CustomBody']))
        story.append(Spacer(1, 12))

        # Employee Submissions
        story.append(Paragraph("Employee Reports", styles['CustomHeading']))
        
        valid_submissions = [s for s in event['submissions'] if "employeeName" in s and "report" in s]
        
        if valid_submissions:
            for submission in valid_submissions:
                story.append(Paragraph(f"<b>{submission['employeeName']}</b>", styles['CustomBody']))
                story.append(Paragraph(submission['report'], styles['CustomBody']))
                story.append(Spacer(1, 12))
        else:
            story.append(Paragraph("No detailed employee reports available for this event.", styles['CustomBody']))

        story.append(Spacer(1, 20))

        # Build PDF
        doc.build(story)
        return filename

    def generate_all_reports(self):
        report_files = []
        for event in self.events:
            safe_name = "".join(c if c.isalnum() else "_" for c in event["eventName"])
            filename = f"{safe_name}_report.pdf"
            report_file = self.save_event_report(event, filename)
            report_files.append(report_file)
            print(f"Generated report for {event['eventName']}: {report_file}")
        return report_files

# Fetch data from API
def fetch_org_data(org_id):
    url = f"http://localhost:5000/api/admin/{org_id}/"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching data: {response.status_code}")
        return None

if __name__ == "__main__":
    # Fetch organization data
    org_id = "67f9547d1bf4fcddd0264e70"
    org_data = fetch_org_data(org_id)
    
    if org_data:
        # Create report generator
        generator = EventReportGenerator(org_data)
        
        # Generate reports for all events
        report_files = generator.generate_all_reports()
        
        print(f"\nGenerated {len(report_files)} event reports:")
        for file in report_files:
            print(f"- {file}")
    else:
        print("Failed to fetch organization data.") 