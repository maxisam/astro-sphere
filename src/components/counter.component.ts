import { ChangeDetectionStrategy, Component, signal } from "@angular/core";

@Component({
  selector: "app-counter",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex gap-4 items-center">
      <button
        (click)="increment()"
        class="px-3 py-1 border border-black/25 dark:border-white/25 hover:bg-black/5 dark:hover:bg-white/15 blend"
      >
        Increment
      </button>
      <div>
        Clicked {{ count() }} {{ count() === 1 ? "time" : "times" }}
      </div>
    </div>
  `,
})
export class CounterComponent {
  count = signal(0);

  increment() {
    this.count.update((value) => value + 1);
  }
}
