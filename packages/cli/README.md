# @ahmadubaidillah/cli 🚀

The official Command Line Interface for **DevForge**, the elite modular boilerplate ecosystem.

## 📦 Installation

You don't need to install this globally. Simply use `npx`:

```bash
npx @ahmadubaidillah/cli --help
```

Or if you are a Bun user:

```bash
bunx @ahmadubaidillah/cli --help
```

## 🛠 Commands

### `create`

Scaffold a new project using one of our high-end templates.

```bash
npx @ahmadubaidillah/cli create my-app
```

**Options:**

- `-a, --with-agents`: Include the premium AI agent system.

### `add`

Inject a new plugin/module into an existing DevForge project.

```bash
npx @ahmadubaidillah/cli add auth
```

### `list`

List all officially supported plugins and templates.

```bash
npx @ahmadubaidillah/cli list
```

### `gain`

View your LLM token savings and efficiency score (Powered by RTK-Filter).

```bash
npx @ahmadubaidillah/cli gain --history
```

### `doctor`

Run a diagnostic on your current project to ensure it meets DevForge architectural standards.

```bash
npx @ahmadubaidillah/cli doctor
```

## 🧠 Premium Agents

To activate premium agents, you will need an activation key. When running `create --with-agents`, you will be prompted to enter your key or set the `DEVFORGE_AGENT_KEY` environment variable.

## 🏗 Development

If you are contributing to this CLI:

1. Clone the root DevForge repo.
2. Run `bun install`.
3. Build the packages: `bun run build`.
4. Test locally: `bun run src/bin.ts --help`.

---

**Build fast. Build lean. Build with DevForge.**
