import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface IncomeEntry {
  source: string;
  category: string;
  amount: number;
  date: string;
  description: string;
}

@Component({
  selector: 'app-data-entry',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './data-entry.html',
  styleUrl: './data-entry.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataEntry {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly storageKey = 'expense-manager-income-entries';

  incomeForm = this.fb.nonNullable.group({
    source: ['', [Validators.required, Validators.minLength(2)]],
    category: ['Salary', Validators.required],
    amount: [0, [Validators.required, Validators.min(1)]],
    date: [this.todayString(), Validators.required],
    description: ['', [Validators.maxLength(200)]],
  });

  entries: IncomeEntry[] = [];

  constructor() {
    this.entries = this.readSavedEntries();
  }

  onSubmit(): void {
    if (this.incomeForm.invalid) {
      this.incomeForm.markAllAsTouched();
      return;
    }

    const rawValue = this.incomeForm.getRawValue();
    const entry: IncomeEntry = {
      source: rawValue.source.trim(),
      category: rawValue.category.trim() || 'Salary',
      amount: Number(rawValue.amount),
      date: rawValue.date || this.todayString(),
      description: rawValue.description?.trim() || '',
    };

    this.entries = [entry, ...this.entries];
    this.saveEntries(this.entries);
    this.incomeForm.reset({
      source: '',
      category: 'Salary',
      amount: 0,
      date: this.todayString(),
      description: '',
    });

    this.router.navigate(['/dashboard']);
  }

  totalIncome(): number {
    return this.entries.reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  }

  private readSavedEntries(): IncomeEntry[] {
    if (typeof window === 'undefined' || !window.localStorage) {
      return [];
    }

    try {
      const saved = window.localStorage.getItem(this.storageKey);
      if (!saved) {
        return [];
      }

      const parsed = JSON.parse(saved) as IncomeEntry[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private saveEntries(entries: IncomeEntry[]): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    window.localStorage.setItem(this.storageKey, JSON.stringify(entries));
  }

  private todayString(): string {
    return new Date().toISOString().split('T')[0];
  }
}
