### 🟢 **What We Want to Do (Best Practices)**

**1. Libraries & Technologies**

- **Stick to the Approved Stack:** Prioritize the open-source technologies outlined in your proposal (React, Node.js, Express, Python).

- **Isolate Environments:** Use Docker to containerize your Node.js API and your Python AI microservices to ensure consistent deployment environments and avoid "it works on my machine" issues.

- **Use the Right DB for the Right Job:** Keep your data separated exactly as planned. Use PostgreSQL strictly for structured, transactional data (Users, Orders), and MongoDB for flexible data (Product Catalogs, Behavioral Logs).

**2. Error Handling & Logging**

- **User-Friendly Feedback:** Always display clear, understandable error messages and validation feedback on the React frontend, as mandated by your non-functional requirements (NFR-027).

- **Centralized Backend Logging:** Implement detailed monitoring and logging facilities in your Node.js layer (NFR-033). Use an HTTP request logger (like Morgan or Winston in Node.js) to track API failures and audit critical activities (NFR-019).

- **Fail Gracefully (Fault Tolerance):** If an AI microservice goes down, the core marketplace must remain active (NFR-013). Implement fallback interfaces and logic (e.g., if the AI recommendation engine fails, show "Popular Products" instead).

**3. AI Boundaries & Constraints**

- **Keep AI Advisory:** Follow your business rules strictly: AI-generated recommendations and pricing suggestions are _advisory_ and do not guarantee outcomes.

- **Empower the Seller:** Always allow sellers to define minimum and maximum pricing limits (FR-027) and ensure manual override options are clearly provided for dynamic pricing.

- **Handle "Cold Starts" Elegantly:** Your AI needs historical data to work. For new users with no behavioral history, implement a fallback strategy that shows trending or category-specific products until enough data is collected.

- **Continuous AI Training:** Fraudsters adapt quickly. Plan for your anomaly detection models to be retrained regularly on new fraud patterns to remain effective over time.

---

### 🛑 **What to Avoid (Anti-Patterns)**

**1. Libraries & Technologies**

- **Avoid Over-Engineering:** Do not introduce unvetted third-party libraries for simple tasks that native JavaScript or Python can handle. Every new library is a potential security vulnerability or maintenance burden.
- **Avoid Direct Database Cross-Talk:** Your Python AI services should _not_ mutate the PostgreSQL database directly. They should read data, generate insights, and send those insights back to the Node.js API, which then safely updates the database.

**2. Error Handling**

- **Avoid Silent Failures:** Never use empty `catch` blocks in your code. If an API call fails or a transaction drops, it must be logged.
- **Never Expose Stack Traces:** Do not send raw backend error logs or stack traces to the frontend. This exposes your system architecture to malicious users and violates security best practices.

**3. AI Boundaries**

- **Avoid "Black Box" Pricing:** Do not automatically change a seller's price without transparency. The system must notify sellers regarding recommended pricing adjustments (FR-028) and explain _why_ a price was suggested (e.g., "Competitor dropped price by 10%").

- **Avoid Training on Production Databases:** Do not run heavy ML training scripts (like Stable-Baselines3 or TensorFlow) directly on your live PostgreSQL or MongoDB production databases, as this will crash the system for active buyers. Train models on data dumps or read-replicas.
