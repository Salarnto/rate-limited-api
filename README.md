# Rate-limited API

A secure API with Redis-based rate limiting to prevent abuse and ensure fair usage.

## Features

- Limits excessive requests from a single client

## How it works?

When a client makes a request, the `rateLimiter` middleware intercepts the request before it reaches the endpoint. Redis checks if the client (by IP) has exceeded the allowed requests or not. If allowed, the request proceeds otherwise blocks.

I've used fixed window counter pattern which is very simple, but we'll face a problem called **Burst Requests at Window Edges**.

Example:

- A client makes 100 requests at 00:59 (last second of the window).
- At 01:00, the window resets, allowing another 100 requests immediately.
- Total: 200 requests in just 2 seconds!

This defeats the purpose of rate limiting, as clients can double their allowed requests by timing bursts at window transitions.

To fix this, we can use other patterns such as **Sliding Window Log** or **Sliding Window Counter**.

## Tech Stack

Core stack: **Express.js + Redis**