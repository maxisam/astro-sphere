import { ChangeDetectionStrategy, Component, computed, input, signal } from "@angular/core";
import type { ContentEntry } from "@lib/content-types";
import Fuse from "fuse.js";
import { ArrowCardComponent } from "@components/arrow-card.component";
import { SearchBarComponent } from "@components/search-bar.component";

@Component({
  selector: "app-search",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SearchBarComponent, ArrowCardComponent],
  template: `
    <div class="flex flex-col">
      <app-search-bar
        [query]="query()"
        (queryChange)="onQueryChange($event)"
        [placeholderText]="'What are you looking for?'"
      />

      @if (query().length >= 2 && results().length >= 1) {
        <div class="mt-12">
          <div class="text-sm uppercase mb-2">
            Found {{ results().length }} results for '{{ query() }}'
          </div>
          <ul class="flex flex-col gap-3">
            @for (result of results(); track result.slug) {
              <li>
                <app-arrow-card [entry]="result" [pill]="true" />
              </li>
            }
          </ul>
        </div>
      }
    </div>
  `,
})
export class SearchComponent {
  data = input<ContentEntry[]>([]);

  query = signal("");

  private fuse = computed(
    () =>
      new Fuse(this.data(), {
        keys: ["slug", "data.title", "data.summary", "data.tags"],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.4,
      }),
  );

  results = computed(() => {
    const q = this.query();
    if (q.length < 2) {
      return [];
    }
    return this.fuse().search(q).map((result) => result.item);
  });

  onQueryChange(value: string) {
    this.query.set(value);
  }
}
