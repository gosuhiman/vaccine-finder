# vaccine-finder

Slack bot to make it easier to find available flu vaccines in local pharmacies.

## Usage

```
./build
./deploy
```

Some manual setup for AWS Lambda / EventBridge (CloudWatch Events) still required. 

### Env vars
- SLACK_TOKEN - token to slack app with chat:write permission
- SLACK_CHANNEL - channel where the notification will be posted
