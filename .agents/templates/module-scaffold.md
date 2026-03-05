```typescript
// .routes.ts
import { Hono } from "hono";
import { featureController } from "./feature.controller";

const featureRoutes = new Hono();

// @permission feature.read
featureRoutes.get("/", featureController.getList);

export { featureRoutes };
```

```typescript
// .service.ts
import { DevForgeError } from "../../core/errors";

export const featureService = {
  async logic() {
    // Validated business logic, DTO mapping
  },
};
```

```typescript
// .repository.ts
import { db } from "../../core/database";

export const featureRepository = {
  async fetchQuery() {
    // Underlying DB queries
  },
};
```

```typescript
// .validator.ts
import { z } from "zod";

export const featureSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3),
});
```
