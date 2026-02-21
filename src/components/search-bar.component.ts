import { ChangeDetectionStrategy, Component, input, output } from "@angular/core";

@Component({
  selector: "app-search-bar",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative">
      <svg
        class="absolute size-6 left-2 top-[0.45rem] stroke-neutral-400 dark:stroke-neutral-500 pointer-events-none"
      >
        <use [attr.href]="baseUrl + 'ui.svg#search'" />
      </svg>
      <input
        name="search"
        type="text"
        [value]="query()"
        (input)="onInput($event)"
        autocomplete="off"
        spellcheck="false"
        [placeholder]="placeholderText()"
        class="w-full px-10 py-1.5 rounded outline-none placeholder-neutral-400 dark:placeholder-neutral-500 text-black dark:text-white bg-black/5 dark:bg-white/10 hover:bg-black/10 hover:dark:bg-white/15 focus:bg-black/10 focus:dark:bg-white/15 border border-black/10 dark:border-white/10 focus:border-black/40 focus:dark:border-white/40"
      />
      @if (query().length > 0) {
        <button
          (click)="clear()"
          class="absolute flex justify-center items-center h-full w-10 right-0 top-0 stroke-neutral-400 dark:stroke-neutral-500 hover:stroke-neutral-600 hover:dark:stroke-neutral-300"
        >
          <svg class="size-5">
            <use [attr.href]="baseUrl + 'ui.svg#x'" />
          </svg>
        </button>
      }
    </div>
  `,
})
export class SearchBarComponent {
  baseUrl = import.meta.env.BASE_URL ?? "/";
  query = input.required<string>();
  placeholderText = input.required<string>();
  queryChange = output<string>();

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.queryChange.emit(target.value);
  }

  clear() {
    this.queryChange.emit("");
  }
}
