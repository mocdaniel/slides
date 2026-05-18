import { useState, useMemo } from 'preact/hooks';
import '../styles/talks.css';

interface Talk {
  slug: string;
  title: string;
  info?: string;
  date?: string;
  event?: string;
  location?: string;
  tags: string[];
  cover?: string;
}

interface Props {
  talks: Talk[];
  allTags: string[];
}

function formatDate(date?: string): string | null {
  if (!date) return null;
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function CardTags({ tags }: { tags: string[] }) {
  if (!tags.length) return null;
  return (
    <div class="talk-card-tags">
      {tags.map(tag => (
        <span key={tag} class="tag-chip">{tag}</span>
      ))}
    </div>
  );
}

function TalkCard({ talk }: { talk: Talk }) {
  const date = formatDate(talk.date);
  return (
    <a href={`/${talk.slug}/`} class="talk-card">
      <h2 class="talk-card-title">{talk.title}</h2>

      {(date || talk.event) && (
        <div class="talk-card-meta">
          {date && <time>{date}</time>}
          {date && talk.event && <span class="meta-sep">·</span>}
          {talk.event && <span>{talk.event}</span>}
        </div>
      )}

      {talk.info && <p class="talk-card-info">{talk.info}</p>}

      <CardTags tags={talk.tags} />
    </a>
  );
}

export default function TalkExplorer({ talks, allTags }: Props) {
  const [search, setSearch] = useState('');
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return talks.filter(talk => {
      if (q) {
        const haystack = [talk.title, talk.info, talk.event]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (activeTags.size > 0) {
        // OR: talk must have at least one active tag
        if (!talk.tags.some(t => activeTags.has(t))) return false;
      }
      return true;
    });
  }, [talks, search, activeTags]);

  function toggleTag(tag: string) {
    setActiveTags(prev => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  }

  function clearFilters() {
    setSearch('');
    setActiveTags(new Set());
  }

  const hasFilters = search.trim() !== '' || activeTags.size > 0;

  return (
    <main class="explorer">
      <h1 class="explorer-heading">Talks</h1>

      <div class="explorer-controls">
        <input
          class="explorer-search"
          type="search"
          placeholder="Search by title, description, or event…"
          value={search}
          onInput={e => setSearch((e.target as HTMLInputElement).value)}
        />

        {allTags.length > 0 && (
          <div class="explorer-filter-row">
            <span class="filter-label">Tags</span>
            {allTags.map(tag => (
              <button
                key={tag}
                class={`tag-chip interactive${activeTags.has(tag) ? ' active' : ''}`}
                onClick={() => toggleTag(tag)}
                type="button"
              >
                {tag}
              </button>
            ))}
            {hasFilters && (
              <button class="clear-btn" onClick={clearFilters} type="button">
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      <p class="explorer-count">
        {filtered.length === talks.length
          ? `${talks.length} talk${talks.length !== 1 ? 's' : ''}`
          : `${filtered.length} of ${talks.length} talk${talks.length !== 1 ? 's' : ''}`}
      </p>

      {filtered.length === 0 ? (
        <p class="explorer-empty">No talks match your filters.</p>
      ) : (
        <div class="talks-grid">
          {filtered.map(talk => (
            <TalkCard key={talk.slug} talk={talk} />
          ))}
        </div>
      )}
    </main>
  );
}
