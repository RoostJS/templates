export function getFromLocal(key: string): { [key: string]: any } {
  const local = localStorage.getItem(key);
  if (!local) {
    return {};
  }

  return JSON.parse(local) || {};
}

export function saveToLocal(key: string, data: { [key: string]: any }): void {
  localStorage.setItem(key, '{}');
  localStorage.setItem(key, JSON.stringify(data));
}

export function clearLocalStorage(): void {
  localStorage.clear();
}
