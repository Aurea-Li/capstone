# Welcome to the Lending Library!

## Useful Commands
- `firebase serve --only functions`: testing HTTP endpoints.
- `firebase deploy --only functions:app`: deploy only endpoints.

## Useful Links
- https://github.com/firebase/functions-samples

## Endpoints
- `https://us-central1-al-capstone.cloudfunctions.net/app/members?groupID=${groupID}`: Given the group ID, retrieves a list of all the member names.
- `https://us-central1-al-capstone.cloudfunctions.net/app/groups?uid=${uid}`: Given a user ID, retrieves a list of all the groups they are currently a member in.
- `https://us-central1-al-capstone.cloudfunctions.net/app/availablebooks?groupID=${groupID}`: Given the group ID, retrieves a list of all available books from the group members.
- `https://us-central1-al-capstone.cloudfunctions.net/app/bookrequests?groupID=${groupID}`: Given a group ID, retrieves a list of all book requests from the group members.
