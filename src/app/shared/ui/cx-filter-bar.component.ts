import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FilterOption {
  key: string;
  label: string;
  count?: number;
}

export interface FilterGroup {
  key: string;
  label: string;
  options: FilterOption[];
}

@Component({
  selector: 'cx-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="cx-filters" role="search" aria-label="Catalog filters">
      <label class="cx-search" *ngIf="searchable">
        <span class="cx-sr">Search services</span>
        <input
          type="search"
          [ngModel]="search"
          (ngModelChange)="onSearch($event)"
          placeholder="Search services…"
          aria-label="Search services" />
      </label>
      <div
        class="cx-filter-group"
        *ngFor="let group of visibleGroups"
        role="group"
        [attr.aria-label]="group.label">
        <button
          class="cx-chip"
          type="button"
          *ngFor="let option of group.options"
          [class.active]="selection[group.key] === option.key"
          [attr.aria-pressed]="selection[group.key] === option.key"
          (click)="select(group.key, option.key)">
          {{ option.label }}
          <span class="cx-count" *ngIf="option.count != null">{{ option.count }}</span>
        </button>
      </div>
      <button
        *ngIf="collapsibleGroups.length"
        class="cx-chip cx-more"
        type="button"
        [attr.aria-expanded]="expanded"
        (click)="expanded = !expanded">
        {{ expanded ? 'Fewer filters' : 'Filters' + (activeCount ? ' (' + activeCount + ')' : '') }}
      </button>
      <div class="cx-filter-group" *ngIf="expanded" role="group" aria-label="More filters">
        <ng-container *ngFor="let group of collapsibleGroups">
          <span class="cx-group-label">{{ group.label }}</span>
          <button
            class="cx-chip"
            type="button"
            *ngFor="let option of group.options"
            [class.active]="selection[group.key] === option.key"
            [attr.aria-pressed]="selection[group.key] === option.key"
            (click)="select(group.key, option.key)">
            {{ option.label }}
          </button>
        </ng-container>
      </div>
      <button
        *ngIf="activeCount || search"
        class="cx-chip cx-clear"
        type="button"
        (click)="clearAll()">
        Clear all
      </button>
      <label class="cx-sort" *ngIf="sortOptions?.length">
        <span class="cx-sr">Sort services</span>
        <select [ngModel]="sort" (ngModelChange)="onSort($event)" aria-label="Sort services">
          <option *ngFor="let option of sortOptions" [value]="option.key">{{ option.label }}</option>
        </select>
      </label>
    </div>
  `,
  styles: [`
    .cx-filters { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; align-items: center; margin-bottom: 28px; }
    .cx-filter-group { display: contents; }
    .cx-chip {
      padding: 8px 16px; min-height: var(--touch-min); border-radius: var(--radius-full);
      background: var(--surface-2); border: 1px solid var(--border); color: var(--text-muted);
      font-weight: 600; font-size: var(--text-sm); cursor: pointer; font-family: var(--font-body);
    }
    .cx-chip.active {
      color: #fff; background: linear-gradient(90deg, var(--accent), #7c6cf6);
      border-color: transparent;
    }
    .cx-more { border-style: dashed; }
    .cx-clear { background: transparent; }
    .cx-count { opacity: 0.75; font-size: var(--text-xs); margin-left: 4px; }
    .cx-group-label { width: 100%; text-align: center; font-size: var(--text-xs); letter-spacing: 1px; text-transform: uppercase; color: var(--text-muted); }
    .cx-search input[type="search"] { min-height: var(--touch-min); max-width: 280px; }
    .cx-sort select {
      min-height: var(--touch-min); background: var(--surface-2); color: var(--text);
      border: 1px solid var(--border); border-radius: var(--radius-full);
      padding: 0 var(--space-4); font-size: var(--text-sm); font-family: var(--font-body);
    }
    .cx-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  `]
})
export class CxFilterBarComponent {
  @Input() groups: FilterGroup[] = [];
  @Input() collapsibleGroups: FilterGroup[] = [];
  @Input() selection: Record<string, string> = {};
  @Input() search = '';
  @Input() searchable = false;
  @Input() sort = '';
  @Input() sortOptions: FilterOption[] = [];
  @Input() visibleGroupKeys: string[] = [];
  @Input() clearLabel = 'Clear all';
  @Output() selectionChange = new EventEmitter<Record<string, string>>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<string>();
  expanded = false;

  get visibleGroups(): FilterGroup[] {
    if (!this.visibleGroupKeys.length) return this.groups;
    return this.groups.filter((group) => this.visibleGroupKeys.includes(group.key));
  }

  get activeCount(): number {
    return Object.values(this.selection).filter((value) => value && value !== 'all').length;
  }

  select(groupKey: string, optionKey: string): void {
    this.selectionChange.emit({ ...this.selection, [groupKey]: optionKey });
  }

  onSearch(value: string): void {
    this.searchChange.emit(value);
  }

  onSort(value: string): void {
    this.sortChange.emit(value);
  }

  clearAll(): void {
    const cleared: Record<string, string> = {};
    for (const key of Object.keys(this.selection)) cleared[key] = 'all';
    this.selectionChange.emit(cleared);
    this.searchChange.emit('');
    this.expanded = false;
  }
}
