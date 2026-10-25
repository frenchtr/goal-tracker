import { describe, expect, it } from "vitest";
import { rulesPackageName } from "./index";

describe("shared rules package", () => {
  it("is the package both apps import", () => {
    expect(rulesPackageName).toBe("@goal-tracker/rules");
  });
});
