import { theme } from "../ui/theme.js";

export function examples(lines: string[]): string {
  return `
${theme.section("Examples")}
${lines.map((line) => `  ${theme.command(line)}`).join("\n")}
`;
}

export function notes(lines: string[]): string {
  return `
${theme.section("Notes")}
${lines.map((line) => `  ${theme.muted(line)}`).join("\n")}
`;
}

export function rootFooter(): string {
  return `
${theme.section("Quick start")}
  ${theme.command("brutils <command> --help")}
  ${theme.command("brutils <command> <action> --help")}

${theme.section("Examples")}
  ${theme.command("brutils cpf generate --formatted")}
  ${theme.command('brutils str slug --text "Hello Cool World"')}
  ${theme.command("brutils json format --file ./config.json --sort-keys")}
  ${theme.command("brutils hash sha256 --text hello")}
  ${theme.command("brutils id token --length 24 --charset base64url")}
  ${theme.command("brutils date diff --from 2024-01-01T00:00:00Z --to 2024-01-03T00:00:00Z --unit days")}
  ${theme.command("brutils random-number int --min 1 --max 60 --count 6 --unique --sorted")}
  ${theme.command("brutils zip create ./folder --out ./backup.zip --force")}

${theme.section("Tips")}
  ${theme.muted("The official interface is the brutils command.")}
  ${theme.muted("Use --no-color if you want plain output.")}
  ${theme.muted("Use module-specific --help to see focused examples.")}
`;
}
