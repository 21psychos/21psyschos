class SectionStore {
  activeId = $state<string | null>(null);

  select(id: string) {
    this.activeId = this.activeId === id ? null : id;
  }

  clear() {
    this.activeId = null;
  }
}

export const sectionStore = new SectionStore();
