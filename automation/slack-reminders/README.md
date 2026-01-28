# Slack reminders for Aibility webinars

Automated Slack reminders for events listed at:
`https://aibility.cz/webinare/nejblizsi-akce`

## How it works
- Vercel Cron calls `/api/cron` (default: every 3 days at 08:00).
- The function scrapes the event list, parses dates, and checks if any event
  is exactly N days away.
- If a match exists, it posts a Slack message and stores a KV flag so it
  does not send the same reminder twice.

## Slack webhook setup
1. Go to https://api.slack.com/apps
2. **Create New App** → **From scratch**
3. Pick a name and workspace
4. **Incoming Webhooks** → toggle **Activate Incoming Webhooks**
5. **Add New Webhook to Workspace**
6. Pick the channel, then copy the webhook URL

If you already have an existing Slack app, you can enable Incoming Webhooks
there instead (no new app slot needed).

## Vercel setup
1. Create a new Vercel project with root at `automation/slack-reminders`
2. Add Vercel KV to the project (Storage → KV)
3. Add environment variables:
   - `SLACK_WEBHOOK_URL`
   - `REMINDER_DAYS` (optional, default `10`, example `10,14`)
   - `TZ` (optional, default `Europe/Prague`)
4. Deploy

## Cron schedule
Edit `vercel.json` to change the schedule:
```
0 8 */3 * *
```
Example: every day at 08:00
```
0 8 * * *
```

## Notes
- The scraper looks for links under `/webinare/` and parses Czech date formats
  like `28. ledna 2026`.
- If the page structure changes, adjust `lib/scrapeEvents.ts`.
