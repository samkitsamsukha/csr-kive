from flask import Flask, request, jsonify, send_file
from generate_report import EventReportGenerator, fetch_org_data
import os
from datetime import datetime
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/api/generate-report/<org_id>', methods=['GET'])
def generate_org_report(org_id):
    """
    Generate reports for all events of a specific organization
    """
    try:
        # Fetch organization data
        org_data = fetch_org_data(org_id)
        if not org_data:
            return jsonify({"error": "Failed to fetch organization data"}), 404

        # Generate reports
        generator = EventReportGenerator(org_data)
        report_files = generator.generate_all_reports()

        # Return list of generated report files
        return jsonify({
            "message": f"Generated {len(report_files)} reports successfully",
            "reports": report_files
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/generate-single-report/<org_id>/<event_name>', methods=['GET'])
def generate_single_report(org_id, event_name):
    """
    Generate a report for a specific event of an organization
    """
    try:
        # Fetch organization data
        event_name = event_name.replace("_", " ")

        org_data = fetch_org_data(org_id)
        if not org_data:
            return jsonify({"error": "Failed to fetch organization data"}), 404

        # Find the specific event
        event = None
        for e in org_data.get('events', []):
            if e.get('eventName') == event_name:
                event = e
                break

        if not event:
            return jsonify({"error": f"Event '{event_name}' not found"}), 404

        # Generate report for the specific event
        generator = EventReportGenerator(org_data)
        safe_name = "".join(c if c.isalnum() else "_" for c in event_name)
        filename = f"{safe_name}_report.pdf"
        report_file = generator.save_event_report(event, filename)

        # Return the generated report file
        return send_file(
            report_file,
            as_attachment=True,
            download_name=filename,
            mimetype='application/pdf'
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/organization/<org_id>', methods=['GET'])
def get_organization(org_id):
    """
    Get organization data
    """
    try:
        org_data = fetch_org_data(org_id)
        if not org_data:
            return jsonify({"error": "Organization not found"}), 404
        return jsonify(org_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/events/<org_id>', methods=['GET'])
def get_events(org_id):
    """
    Get all events for an organization
    """
    try:
        org_data = fetch_org_data(org_id)
        if not org_data:
            return jsonify({"error": "Organization not found"}), 404
        return jsonify(org_data.get('events', [])), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001) 