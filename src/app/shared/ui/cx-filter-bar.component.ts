import { TranslatePipe } from '../language.service';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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
  imports: [TranslatePipe, CommonModule, FormsModule],
  template: `
    <div class="cx-filters" role="search" aria-label="Catalog filters">
      <div class="cx-filter-tools">
        <label class="cx-search" *ngIf="searchable">
          <span class="cx-sr">Search services</span>
          <input type="search" [ngModel]="search" (ngModelChange)="searchChange.emit($event)"
            [placeholder]="'Search services' | tr" autocomplete="off" aria-label="Search services" />
        </label>
        <button #openButton type="button" class="cx-filter-trigger" aria-haspopup="dialog"
          [attr.aria-expanded]="isOpen" (click)="openFilters()">
          {{ "Filters" | tr }}<span *ngIf="advancedCount"> · {{ advancedCount }}</span>
        </button>
      </div>

      <div class="cx-practices" *ngFor="let group of groups" role="group" [attr.aria-label]="group.label">
        <button class="cx-chip" type="button" *ngFor="let option of group.options"
          [class.active]="(selection[group.key] || 'all') === option.key"
          [attr.aria-pressed]="(selection[group.key] || 'all') === option.key"
          (click)="select(group.key, option.key)">
          <span class="cx-dot" *ngIf="group.key === 'sector' && option.key !== 'all'" [attr.data-key]="option.key" aria-hidden="true"></span>{{ option.label | tr }}<span class="cx-count" *ngIf="option.count != null">{{ option.count }}</span>
        </button>
      </div>

      <div class="cx-filter-footer">
        <span class="cx-result-count" aria-live="polite">{{ resultCount }} {{ (resultCount === 1 ? 'service' : 'services') | tr }}</span>
        <button *ngIf="activeCount || search" type="button" class="cx-reset" (click)="clearAll()">{{ "Clear all" | tr }}</button>
        <label class="cx-sort" *ngIf="sortOptions.length">
          <span class="cx-sr">Sort services</span>
          <select [ngModel]="sort" (ngModelChange)="sortChange.emit($event)" aria-label="Sort services">
            <option *ngFor="let option of sortOptions" [value]="option.key">{{ option.label | tr }}</option>
          </select>
        </label>
      </div>
    </div>

    <dialog #filterPanel class="cx-filter-panel" aria-labelledby="catalog-filter-title" (close)="isOpen = false; openButton.focus()">
      <div class="cx-panel-header">
        <div><span class="cx-panel-eyebrow">{{ "Refine results" | tr }}</span><h2 id="catalog-filter-title">{{ "Filters" | tr }}</h2></div>
        <button type="button" class="cx-panel-close" aria-label="Close filters" (click)="closeFilters()">×</button>
      </div>
      <div class="cx-panel-body">
        <fieldset *ngFor="let group of collapsibleGroups" class="cx-filter-fieldset">
          <legend>{{ group.label | tr }}</legend>
          <div class="cx-panel-options">
            <button type="button" class="cx-chip" *ngFor="let option of group.options"
              [class.active]="(selection[group.key] || 'all') === option.key"
              [attr.aria-pressed]="(selection[group.key] || 'all') === option.key"
              (click)="select(group.key, option.key)">
              {{ option.label | tr }}<span class="cx-count" *ngIf="option.count != null">{{ option.count }}</span>
            </button>
          </div>
        </fieldset>
        <label class="cx-panel-sort" *ngIf="sortOptions.length">{{ "Sort by" | tr }}
          <select [ngModel]="sort" (ngModelChange)="sortChange.emit($event)">
            <option *ngFor="let option of sortOptions" [value]="option.key">{{ option.label | tr }}</option>
          </select>
        </label>
      </div>
      <div class="cx-panel-actions">
        <button type="button" class="cx-panel-reset" (click)="clearAll()">{{ "Clear all" | tr }}</button>
        <button type="button" class="cx-panel-apply" (click)="closeFilters()">{{ "Show" | tr }} {{ resultCount }} {{ (resultCount === 1 ? 'service' : 'services') | tr }}</button>
      </div>
    </dialog>
  `,
  styles: [`
    .cx-filters { display: grid; gap: var(--space-3); margin: 0 0 var(--space-5); }
    .cx-filter-tools { display: flex; gap: var(--space-2); align-items: stretch; }
    .cx-search { flex: 1; max-width: 560px; }
    .cx-search input { width: 100%; height: 48px; background: var(--surface); color: var(--text); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 0 var(--space-4); font: inherit; font-size: 16px; -webkit-appearance: none; appearance: none; }
    .cx-search input:focus { border-color: var(--border-strong); outline: none; box-shadow: 0 0 0 3px var(--signal-soft); }
    .cx-search input::placeholder { color: var(--text-muted); }
    .cx-filter-trigger, .cx-chip, .cx-reset { min-height: var(--touch-min); font: 500 var(--text-sm) var(--font-body); cursor: pointer; }
    .cx-filter-trigger { border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text); padding: 0 var(--space-4); }
    .cx-filter-trigger:hover { border-color: var(--border-strong); }
    .cx-practices { display: flex; gap: var(--space-2); flex-wrap: wrap; }
    .cx-chip { flex: none; display: inline-flex; align-items: center; gap: 8px; padding: 0 var(--space-4); border: 1px solid var(--border); border-radius: var(--radius-full); background: var(--surface); color: var(--text); white-space: nowrap; }
    .cx-chip:hover { border-color: var(--border-strong); }
    .cx-chip.active { background: var(--text); color: var(--bg); border-color: var(--text); }
    .cx-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--text-muted); }
    .cx-dot[data-key="testing"] { background: var(--p-testing); }
    .cx-dot[data-key="mobile"] { background: var(--p-mobile); }
    .cx-dot[data-key="web"] { background: var(--p-web); }
    .cx-dot[data-key="ai"] { background: var(--p-ai); }
    .cx-dot[data-key="training"] { background: var(--p-training); }
    .cx-count { font-family: var(--font-mono); font-size: var(--text-xs); opacity: .75; }
    .cx-filter-footer { display: flex; align-items: center; gap: var(--space-3); min-height: 44px; border-bottom: 2px solid var(--border-strong); }
    .cx-result-count { color: var(--text-muted); font-family: var(--font-mono); font-size: var(--text-xs); }
    .cx-reset { padding: 0 var(--space-2); background: none; border: none; color: var(--text); text-decoration: underline; text-underline-offset: 4px; }
    .cx-sort { margin-left: auto; }
    select { min-height: var(--touch-min); background: var(--surface); color: var(--text); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 0 var(--space-4); font: 500 var(--text-sm) var(--font-body); }
    .cx-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
    .cx-filter-panel { position: fixed; inset: 0 0 0 auto; margin: 0; width: min(420px, 100vw); max-height: 100dvh; height: 100dvh; padding: 0; background: var(--bg); color: var(--text); border: 1px solid var(--border); box-shadow: var(--shadow-2); overflow: hidden; }
    .cx-filter-panel::backdrop { background: rgba(21, 24, 30, .45); }
    .cx-panel-header { display: flex; align-items: start; justify-content: space-between; border-bottom: 1px solid var(--border); padding: var(--space-5); }
    .cx-panel-header h2 { font-size: var(--text-3xl); font-weight: 600; }
    .cx-panel-eyebrow { color: var(--text-muted); font-family: var(--font-mono); font-size: var(--text-xs); }
    .cx-panel-close { width: var(--touch-min); height: var(--touch-min); background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-sm); color: var(--text); font-size: 26px; cursor: pointer; }
    .cx-panel-body { padding: var(--space-5); overflow-y: auto; height: calc(100% - 186px); }
    .cx-filter-fieldset { border: 0; border-top: 1px solid var(--border); margin: 0 0 var(--space-5); padding: var(--space-3) 0; }
    .cx-filter-fieldset legend { font-weight: 600; padding: 0 var(--space-2) 0 0; }
    .cx-panel-options { display: flex; flex-wrap: wrap; gap: var(--space-2); }
    .cx-panel-sort { display: grid; gap: var(--space-2); font-weight: 600; }
    .cx-panel-actions { display: flex; gap: var(--space-3); padding: var(--space-4) var(--space-5); border-top: 1px solid var(--border); }
    .cx-panel-actions button { min-height: 48px; cursor: pointer; font-weight: 600; border-radius: var(--radius-sm); padding: 0 var(--space-4); font-size: var(--text-md); }
    .cx-panel-reset { border: 1px solid var(--border-strong); background: transparent; color: var(--text); }
    .cx-panel-apply { flex: 1; border: 0; color: var(--on-signal); background: var(--signal); }
    @media (max-width: 600px) {
      .cx-search { max-width: none; }
      .cx-practices { overflow-x: auto; flex-wrap: nowrap; padding: var(--space-1) 0 var(--space-2); scrollbar-width: none; }
      .cx-practices::-webkit-scrollbar { display: none; }
      .cx-sort { display: none; }
      .cx-filter-panel { inset: auto 0 0; width: 100%; height: min(84dvh, 740px); max-height: 84dvh; border-radius: var(--radius-lg) var(--radius-lg) 0 0; }
      .cx-panel-body { height: calc(100% - 186px); }
      .cx-panel-actions { padding-bottom: calc(var(--space-4) + var(--safe-bottom)); }
    }
  `],
})
export class CxFilterBarComponent {
  @Input() groups: FilterGroup[] = [];
  @Input() collapsibleGroups: FilterGroup[] = [];
  @Input() selection: Record<string, string> = {};
  @Input() search = '';
  @Input() searchable = false;
  @Input() sort = '';
  @Input() sortOptions: FilterOption[] = [];
  @Input() resultCount = 0;
  @Output() selectionChange = new EventEmitter<Record<string, string>>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<string>();
  @ViewChild('filterPanel', { static: true }) filterPanel!: ElementRef<HTMLDialogElement>;
  @ViewChild('openButton') openButton!: ElementRef<HTMLButtonElement>;
  isOpen = false;

  get activeCount(): number {
    return Object.values(this.selection).filter(value => value && value !== 'all').length;
  }

  get advancedCount(): number {
    return this.collapsibleGroups.filter(group => this.selection[group.key] && this.selection[group.key] !== 'all').length;
  }

  openFilters(): void {
    this.filterPanel.nativeElement.showModal();
    this.isOpen = true;
  }

  closeFilters(): void {
    this.filterPanel.nativeElement.close();
  }

  select(groupKey: string, optionKey: string): void {
    this.selectionChange.emit({ ...this.selection, [groupKey]: optionKey });
  }

  clearAll(): void {
    const cleared: Record<string, string> = {};
    for (const key of Object.keys(this.selection)) cleared[key] = 'all';
    this.selectionChange.emit(cleared);
    this.searchChange.emit('');
  }
}
