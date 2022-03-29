import React, { useMemo } from "react";
import { useTable } from "react-table";

function TracksTable({ data }) {
	//table headers
	const columns = useMemo(
		() => [
			{
				Header: "Rank",
				accessor: "rank",
			},
			{
				Header: "Album Cover",
				accessor: "albumCover",

				Cell: (cell) => (
					<div className="">
						<img src={cell.cell.value} alt={cell.name} className="albumCover" />
					</div>
				),
			},

			{
				Header: "Track",
				accessor: "track", // accessor is the "key" in the data
			},
			{
				Header: "Artist",
				accessor: "artists", // accessor is the "key" in the data
			},
			{
				Header: "Album",
				accessor: "album",
			},
		],
		[]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data });

	return (
		<div>
			<table {...getTableProps()} className="w-full m-auto">
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th key={column.id} className="tableHeaders ">
									{column.render("Header")}
								</th>
							))}
						</tr>
					))}
				</thead>

				<tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()} className="tableData">
											{cell.render("Cell")}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default TracksTable;
