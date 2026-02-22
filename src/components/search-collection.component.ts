import { ChangeDetectionStrategy, Component, computed, input, signal } from "@angular/core";
import type { AfterViewInit } from "@angular/core";
import type { ContentEntry } from "@lib/content-types";
import Fuse from "fuse.js";
import { ArrowCardComponent } from "@components/arrow-card.component";
import { SearchBarComponent } from "@components/search-bar.component";
import { cn } from "@lib/utils";

@Component({
  selector: "app-search-collection",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SearchBarComponent, ArrowCardComponent],
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <!-- Control Panel-->
      <div class="col-span-3 sm:col-span-1">
        <div class="sticky top-24 mt-7">
          <!-- Search Bar -->
          <app-search-bar
            [query]="query()"
            (queryChange)="onQueryChange($event)"
            [placeholderText]="'Search ' + entryName()"
          />
          <!-- Tag Filters -->
          <div class="relative flex flex-row justify-between w-full">
            <p class="text-sm font-semibold uppercase my-4 text-black dark:text-white">
              Tags
            </p>
            @if (filter().size > 0) {
              <button
                (click)="clearFilters()"
                class="absolute flex justify-center items-center h-full w-10 right-0 top-0 stroke-neutral-400 dark:stroke-neutral-500 hover:stroke-neutral-600 hover:dark:stroke-neutral-300"
              >
                <svg class="size-5">
                  <use [attr.href]="baseUrl + 'ui.svg#x'" />
                </svg>
              </button>
            }
          </div>
          <ul class="flex flex-wrap sm:flex-col gap-1.5">
            @for (tag of tags(); track tag) {
              <li class="sm:w-full">
                <button
                  (click)="toggleTag(tag)"
                  [class]="cn(
                    'w-full px-2 py-1 rounded',
                    'flex gap-2 items-center',
                    'bg-black/5 dark:bg-white/10',
                    'hover:bg-black/10 hover:dark:bg-white/15',
                    'transition-colors duration-300 ease-in-out',
                    filter().has(tag) && 'text-black dark:text-white'
                  )"
                >
                  <svg
                    [class]="cn(
                      'shrink-0 size-5 fill-black/50 dark:fill-white/50',
                      'transition-colors duration-300 ease-in-out',
                      filter().has(tag) && 'fill-black dark:fill-white'
                    )"
                  >
                    @if (!filter().has(tag)) {
                      <use [attr.href]="baseUrl + 'ui.svg#square'" />
                    }
                    @if (filter().has(tag)) {
                      <use [attr.href]="baseUrl + 'ui.svg#square-check'" />
                    }
                  </svg>

                  <span class="truncate block min-w-0 pt-[2px]">
                    {{ tag }}
                  </span>
                </button>
              </li>
            }
          </ul>
        </div>
      </div>
      <!-- Posts -->
      <div class="col-span-3 sm:col-span-2">
        <div class="flex flex-col">
          <!-- Info Bar -->
          <div class="flex justify-between flex-row mb-2">
            <div class="text-sm uppercase">
              SHOWING {{ collection().length }} OF {{ data().length }} {{ entryName() }}
            </div>
            <button
              (click)="toggleDescending()"
              class="flex flex-row gap-1 stroke-neutral-400 dark:stroke-neutral-500 hover:stroke-neutral-600 hover:dark:stroke-neutral-300 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 hover:dark:text-neutral-300"
            >
              <div class="text-sm uppercase">
                {{ descending() ? "DESCENDING" : "ASCENDING" }}
              </div>
              <svg class="size-5 left-2 top-[0.45rem]">
                @if (descending()) {
                  <use [attr.href]="baseUrl + 'ui.svg#sort-descending'" />
                }
                @if (!descending()) {
                  <use [attr.href]="baseUrl + 'ui.svg#sort-ascending'" />
                }
              </svg>
            </button>
          </div>
          <ul class="flex flex-col gap-3">
            @for (entry of collection(); track entry.slug) {
              <li>
                <app-arrow-card [entry]="entry" />
              </li>
            }
          </ul>
        </div>
      </div>
    </div>
  `,
})
export class SearchCollectionComponent implements AfterViewInit {
  baseUrl = import.meta.env.BASE_URL ?? "/";
  entryName = input("");
  tags = input<string[]>([]);
  data = input<ContentEntry[]>([]);

  query = signal("");
  filter = signal(new Set<string>());
  descending = signal(false);

  cn = cn;

  private coerced = computed(() => this.data());

  private fuse = computed(
    () =>
      new Fuse(this.coerced(), {
        keys: ["slug", "data.title", "data.summary", "data.tags"],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.4,
      }),
  );

  collection = computed(() => {
    const coerced = this.coerced();
    const q = this.query();
    const searched =
      q.length < 2
        ? coerced
        : this.fuse().search(q).map((result) => result.item);

    const filtered = searched.filter((entry) =>
      Array.from(this.filter()).every((value) =>
        entry.data.tags.some(
          (tag: string) => tag.toLowerCase() === String(value).toLowerCase(),
        ),
      ),
    );

    return this.descending() ? [...filtered].reverse() : filtered;
  });

  ngAfterViewInit() {
    if (typeof document === "undefined") {
      return;
    }
    const wrapper = document.getElementById("search-collection-wrapper");
    if (wrapper) {
      wrapper.style.minHeight = "unset";
    }
  }

  onQueryChange(value: string) {
    this.query.set(value);
  }

  toggleDescending() {
    this.descending.update((value) => !value);
  }

  toggleTag(tag: string) {
    const next = new Set(this.filter());
    if (next.has(tag)) {
      next.delete(tag);
    } else {
      next.add(tag);
    }
    this.filter.set(next);
  }

  clearFilters() {
    this.filter.set(new Set<string>());
  }
}
