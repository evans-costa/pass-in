import { ChangeEvent, useEffect, useState } from "react";

import {
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";

import { IconButton } from "./IconButton";
import { Table } from "./Table/Table";
import { TableHeader } from "./Table/TableHeader";
import { TableCell } from "./Table/TableCell";
import { TableRow } from "./Table/TableRow";

interface Attendee {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  checkedInAt: string | null;
}

export function AttendeeList() {
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("page")) {
      return Number(url.searchParams.get("page"));
    }
    return 1;
  });

  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("search")) {
      return url.searchParams.get("search") ?? "";
    }
    return "";
  });

  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / 10);

  useEffect(() => {
    const url = new URL(
      "http://localhost:3333/events/bfa619f2-e367-4190-8e12-e19b19a5ab0c/attendees"
    );

    url.searchParams.set("pageIndex", String(page - 1));

    if (search.length > 0) {
      url.searchParams.set("query", search);
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAttendees(data.attendees);
        setTotal(data.total);
      });
  }, [page, search]);

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());

    url.searchParams.set("page", String(page));

    window.history.pushState({}, "", url);

    setPage(page);
  }

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString());

    url.searchParams.set("search", search);

    window.history.pushState({}, "", url);

    setSearch(search);
  }

  function goToNextPage() {
    setCurrentPage(page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage(page - 1);
  }

  function goToFirstPage() {
    setCurrentPage(1);
  }

  function goToLastPage() {
    setCurrentPage(totalPages);
  }

  function onSearchInputChange(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value);
    setCurrentPage(1);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 ">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="w-72 px-3 py-1.5 border border-white/10 bg-transparent rounded-lg text-sm flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            onChange={onSearchInputChange}
            value={search}
            type="search"
            className="bg-transparent p-0.5 flex-1 border-none focus:ring-0 placeholder:text-zinc-300 text-sm"
            placeholder="Buscar participante..."
          />
        </div>
      </div>
      <Table>
        <thead>
          <TableRow>
            <TableHeader
              style={{ width: 48 }}
              className="py-3 px-4 text-sm font-semibold text-left"
            >
              <input
                className="size-4 bg-black/20 border border-white/10 rounded text-[#F48F56] focus:ring-0"
                type="checkbox"
              />
            </TableHeader>
            <TableHeader className="py-3 px-4 text-sm font-semibold text-left">
              Código
            </TableHeader>
            <TableHeader className="py-3 px-4 text-sm font-semibold text-left">
              Participante
            </TableHeader>
            <TableHeader className="py-3 px-4 text-sm font-semibold text-left">
              Data de inscrição
            </TableHeader>
            <TableHeader className="py-3 px-4 text-sm font-semibold text-left">
              Data de check-in
            </TableHeader>
            <TableHeader
              style={{ width: 64 }}
              className="py-3 px-4 text-sm font-semibold text-left"
            ></TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {attendees.map((attendee, id) => {
            return (
              <TableRow key={id}>
                <TableCell className="py-3 px-4 text-sm text-zinc-300">
                  <input
                    className="size-4 bg-black/20 border border-white/10 rounded text-[#F48F56]"
                    type="checkbox"
                  />
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-zinc-300">
                  {attendee.id}
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-zinc-300">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      {attendee.name}
                    </span>
                    <span>{attendee.email}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-zinc-300">
                  {attendee.createdAt}
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-zinc-300">
                  {attendee.checkedInAt ?? (
                    <span className="text-zinc-400">Não fez check-in</span>
                  )}
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-zinc-300">
                  <IconButton transparent>
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
        <tfoot>
          <TableRow>
            <TableCell
              className="py-3 px-2.5 text-sm text-zinc-300"
              colSpan={3}
            >
              Mostrando {attendees.length} de {total} itens
            </TableCell>
            <TableCell
              className="py-3 px-2.5 text-sm text-zinc-300 text-right"
              colSpan={3}
            >
              <div className="flex items-center justify-end gap-8">
                <span>
                  Página {page} de {totalPages}
                </span>
                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToNextPage}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    disabled={page === totalPages}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </tfoot>
      </Table>
    </div>
  );
}
