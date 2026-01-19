'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  totalPages: number;
}

const Pagination = ({ totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    params.set('page', newPage.toString());
    router.push(`/?${params.toString()}`, { scroll: false });

    const eventsSection = document.getElementById('events');

    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startThreshold = 4;
      const endThreshold = totalPages - 3;

      if (page <= startThreshold) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }

        pages.push(-1);
        pages.push(totalPages);
      } else if (page >= endThreshold) {
        pages.push(1);
        pages.push(-1);

        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(-1);
        pages.push(page - 1);
        pages.push(page);
        pages.push(page + 1);
        pages.push(-1);
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-12 mb-8 flex-wrap select-none">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous Page"
        className="flex items-center justify-center min-w-10 h-10 rounded-full bg-dark-100 hover:bg-dark-200 border border-dark-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:border-primary/50 text-white cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex gap-2 items-center flex-wrap justify-center">
        {getPageNumbers().map((p, i) =>
          p === -1 ? (
            <span
              key={`sep-${i}`}
              className="flex items-center justify-center min-w-10 h-10 text-light-200"
            >
              ...
            </span>
          ) : (
            <button
              key={`${p}-${i}`}
              onClick={() => handlePageChange(p)}
              className={cn(
                'flex items-center justify-center min-w-10 h-10 px-2 rounded-full text-sm font-medium transition-all border cursor-pointer',
                page === p
                  ? 'bg-primary border-primary text-black font-bold shadow-[0_0_15px_rgba(89,222,202,0.3)]'
                  : 'bg-dark-100 border-dark-200 text-light-100 hover:bg-dark-200 hover:border-primary/50',
              )}
            >
              {p}
            </button>
          ),
        )}
      </div>

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next Page"
        className="flex items-center justify-center min-w-10 h-10 rounded-full bg-dark-100 hover:bg-dark-200 border border-dark-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:border-primary/50 text-white cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
