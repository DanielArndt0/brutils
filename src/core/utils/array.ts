export function pickRandomItem<T>(items: T[]): T {
  const item = items[Math.floor(Math.random() * items.length)];

  if (item === undefined) {
    throw new Error("Cannot pick a random item from an empty array.");
  }

  return item;
}