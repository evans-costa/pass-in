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
import { useState } from "react";

import { attendees } from "../mock/attendees";

export function AttendeeList() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(attendees.length / 10);

  function goToNextPage() {
    return page === totalPages ? setPage(totalPages) : setPage(page + 1);
  }

  function goToPreviousPage() {
    return page === 1 ? setPage(1) : setPage(page - 1);
  }

  function goToFirstPage() {
    return setPage(1);
  }

  function goToLastPage() {
    return setPage(totalPages);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 ">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="w-72 px-3 py-1.5 border border-white/10 bg-transparent rounded-lg text-sm flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
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
          {attendees.slice((page - 1) * 10, page * 10).map((_, i) => {
            return (
              <TableRow key={i}>
                <TableCell className="py-3 px-4 text-sm text-zinc-300">
                  <input
                    className="size-4 bg-black/20 border border-white/10 rounded text-[#F48F56]"
                    type="checkbox"
                  />
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-zinc-300">
                  12344
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-zinc-300">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      Evandro Costa
                    </span>
                    <span>evandro@email.com</span>
                  </div>
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-zinc-300">
                  7 dias atrás
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-zinc-300">
                  3 dias atrás
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
              Mostrando 10 de {attendees.length} itens
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
