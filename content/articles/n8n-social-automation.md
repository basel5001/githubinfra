# Autopilot Social Media: How n8n and AI Publish Content While I Sleep

**TL;DR:** I built an n8n automation that generates social media posts with GPT-4o, schedules them, and publishes across Facebook, Twitter, LinkedIn, and Instagram -- completely hands-free.

## The Problem

Maintaining a consistent social media presence across four platforms is a full-time job. Each platform has different optimal posting times, character limits, and content styles. Hiring a social media manager is expensive. Using scheduling tools like Buffer or Hootsuite still requires you to write every post manually. I wanted something that generates the content, adapts it per platform, and publishes on schedule -- without me touching it after initial setup.

## What I Built

`n8n-social-automation` is a self-hosted n8n workflow that uses GPT-4o to generate platform-specific social media content from a topic list, then publishes it on a schedule via each platform's API. The entire pipeline -- from content generation to publishing -- runs in Docker with zero manual intervention.

- **AI content generation** -- GPT-4o writes posts tailored to each platform's style: professional for LinkedIn, punchy for Twitter, conversational for Facebook, visual-caption style for Instagram
- **Topic queue** -- maintain a simple list of topics or RSS feeds; the workflow picks the next topic and generates fresh content
- **Multi-platform publishing** -- posts to Facebook Pages, Twitter/X, LinkedIn company pages, and Instagram via their respective APIs
- **Scheduling** -- configurable posting schedule per platform with timezone awareness
- **Image generation** -- optionally generates accompanying images using DALL-E for visual platforms
- **Content review mode** -- optional approval step that sends drafts to Slack before publishing
- **Analytics webhook** -- receives engagement data back into n8n for tracking performance

## Tech Stack

n8n, OpenAI GPT-4o, Docker, Facebook Graph API, Twitter API v2, LinkedIn API, Instagram API, Node.js

## Usage

```bash
# Start n8n with Docker
git clone https://github.com/basel5001/n8n-social-automation.git
cd n8n-social-automation
cp .env.example .env  # add API keys
docker compose up -d

# Access n8n at http://localhost:5678
# Import the workflow JSON and activate it
```

## Results

Over a 30-day test period, the automation published 120 posts across four platforms with zero manual intervention after setup. LinkedIn posts generated an average of 340 impressions each. The GPT-4o content required manual editing less than 5% of the time when content review mode was enabled. Total API costs for the month: approximately $8 for OpenAI, with all other platform APIs being free tier.

---

GitHub: https://github.com/basel5001/n8n-social-automation
