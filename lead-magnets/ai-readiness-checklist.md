# AI Readiness Checklist

Use this quick checklist before starting or scaling an AI project.

## 1) Problem and Success Metric
- Is the business problem clearly defined?
- Do you have 1-2 measurable success metrics (quality, latency, cost)?
- Is there a baseline process to compare against?

## 2) Data and Knowledge Base
- Is source data accessible, clean, and permission-safe?
- Are key documents or datasets versioned?
- Do you have a data freshness and update strategy?

## 3) Model and Retrieval Strategy
- Have you chosen a model strategy (hosted vs local, cost/performance tradeoff)?
- If RAG is needed, do you have chunking and retrieval rules defined?
- Do you have fallback behavior when confidence is low?

## 4) Architecture and Integration
- Is the API/service architecture mapped (frontend, backend, storage, queue)?
- Are auth and role permissions defined?
- Are integrations with your existing systems scoped?

## 5) Evaluation and Guardrails
- Do you have eval prompts/cases for normal and edge behavior?
- Are hallucination and safety controls defined?
- Are failure-path responses user-safe and actionable?

## 6) Deployment and Operations
- Do you have monitoring for latency, errors, and quality drift?
- Are rate limits, retries, and cache policy configured?
- Is there a rollback plan for regressions?

## 7) Handover and Ownership
- Is technical documentation ready for handoff?
- Is ownership clear for model updates and maintenance?
- Is support scope defined post-launch?

If you want this checklist converted into an implementation plan, contact via the portfolio form and share your current stack + target outcome.
