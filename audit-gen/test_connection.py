import requests
import json
import sys

def test_mongodb_connection(org_id):
    """
    Test the connection to the MongoDB server and fetch organization data
    """
    url = f"http://localhost:5000/api/admin/{org_id}/"
    print(f"Testing connection to: {url}")
    
    try:
        response = requests.get(url)
        print(f"Response status code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Successfully fetched organization data:")
            print(json.dumps(data, indent=2))
            return True
        else:
            print(f"Error fetching data: {response.status_code}")
            print(f"Response content: {response.text}")
            return False
    except Exception as e:
        print(f"Request failed: {str(e)}")
        return False

if __name__ == "__main__":
    # Default admin ID
    org_id = "67f97a70406569c0972224ac"
    
    # Allow overriding the org_id from command line
    if len(sys.argv) > 1:
        org_id = sys.argv[1]
    
    success = test_mongodb_connection(org_id)
    
    if success:
        print("\nConnection test successful!")
        sys.exit(0)
    else:
        print("\nConnection test failed!")
        sys.exit(1) 