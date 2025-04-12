from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from generate_report import EventReportGenerator, fetch_org_data, REPORTS_DIR
import os
import traceback
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Create reports directory if it doesn't exist
if not os.path.exists(REPORTS_DIR):
    os.makedirs(REPORTS_DIR)
    logger.info(f"Created reports directory at {REPORTS_DIR}")

@app.route('/api/generate-report/<org_id>', methods=['GET'])
def generate_org_report(org_id):
    """
    Generate reports for all events of a specific organization
    """
    logger.info(f"Generating reports for organization ID: {org_id}")
    try:
        # Fetch organization data
        logger.info("Fetching organization data...")
        org_data = fetch_org_data(org_id)
        if not org_data:
            logger.error("Failed to fetch organization data")
            return jsonify({"error": "Failed to fetch organization data"}), 404

        # Generate reports
        logger.info("Generating reports...")
        generator = EventReportGenerator(org_data)
        report_files = generator.generate_all_reports()

        # Return list of generated report files
        logger.info(f"Successfully generated {len(report_files)} reports")
        return jsonify({
            "message": f"Generated {len(report_files)} reports successfully",
            "reports": report_files
        }), 200

    except Exception as e:
        logger.error(f"Error generating reports: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@app.route('/api/generate-single-report/<org_id>/<event_name>', methods=['GET'])
def generate_single_report(org_id, event_name):
    """
    Generate a report for a specific event of an organization
    """
    logger.info(f"Generating single report for organization ID: {org_id}, event: {event_name}")
    try:
        # Fetch organization data
        logger.info("Fetching organization data...")
        org_data = fetch_org_data(org_id)
        if not org_data:
            logger.error("Failed to fetch organization data")
            return jsonify({"error": "Failed to fetch organization data"}), 404

        # Find the specific event
        logger.info("Finding specific event...")
        event = None
        for e in org_data.get('events', []):
            if e.get('eventName') == event_name:
                event = e
                break

        if not event:
            logger.error(f"Event '{event_name}' not found")
            return jsonify({"error": f"Event '{event_name}' not found"}), 404

        # Generate report for the specific event
        logger.info("Generating report...")
        generator = EventReportGenerator(org_data)
        safe_name = "".join(c if c.isalnum() else "_" for c in event_name)
        filename = f"{safe_name}_report.pdf"
        report_file = generator.save_event_report(event, filename)

        # Return the generated report file
        logger.info(f"Successfully generated report: {report_file}")
        return send_file(
            report_file,
            as_attachment=True,
            download_name=filename,
            mimetype='application/pdf'
        )

    except Exception as e:
        logger.error(f"Error generating single report: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    logger.info("Starting Flask server...")
    app.run(port=5001, debug=True) 