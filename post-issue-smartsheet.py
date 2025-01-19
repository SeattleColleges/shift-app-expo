import requests
import smartsheet
import logging
import os

SMART_ACCESS_TOKEN = os.environ['SMART_ACCESS_TOKEN']
GITHUB_ACCESS_TOKEN = os.environ['GH_ACCESS_TOKEN']
ISSUE_NUM = os.environ['ISSUE_NUM'] 

# Initialize client. Uses the API token in the environment variable 'SMARTSHEET_ACCESS_TOKEN'
smart = smartsheet.Smartsheet(SMART_ACCESS_TOKEN)
# Make sure we don't miss any error
smart.errors_as_exceptions(True)

# Log all calls
logging.basicConfig(filename='rwsheet.log', level=logging.INFO)

while True:  # Retry until a valid issue is found
    # Fetch issue or PR details
    response = requests.get(
        f'https://api.github.com/repos/SeattleColleges/shift-app-expo/issues/{ISSUE_NUM}',
        headers={
            'Authorization': f'Bearer {GITHUB_ACCESS_TOKEN}',
            'Content-Type': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
        }
    )

    if response.status_code != 200:
        print(f"Error fetching issue #{ISSUE_NUM}: {response.json()}")
        exit(1)  # Stop if the API fails

    data = response.json()

    # Check if the item is a PR
    if 'pull_request' in data:
        print(f"Skipping PR #{ISSUE_NUM}. Incrementing to the next number...")
        ISSUE_NUM += 1  # Increment and retry
        continue

    # Process the valid issue
    assignee = data.get('assignee', {}).get('login', 'Missing assignee')
    title = data.get('title', 'No Title')
    repo_url = data.get('repository_url', 'No Repo URL')
    index = data.get('number', 'No Index')

# POST request to Smartsheet API
smartsheet_response = requests.post(
    'https://api.smartsheet.com/2.0/sheets/5425857896075140/rows',
    headers={'Authorization': f'Bearer {SMART_ACCESS_TOKEN}', 'Content-Type': 'application/json'},
    json={
        'sheetId': 5425857896075140,
        'accessLevel': 'OWNER',
        'createdBy': {
            'name': 'automation'
        },
        'cells': [
            {
            'columnId': 2188750605209476,
            'displayValue': 'title',
            'value': title
            },
            {
            'columnId': 6692350232579972,
            'displayValue': 'repo url',
            'value': repo_url[45:]
            },
            {
            'columnId': 8944150046265220,
            'displayValue': 'assignee',
            'value': assignee
            },
            {
            'columnId': 42503907790724,
            'displayValue': 'index',
            'value': index
            }
        ]
        })