import React, { useMemo } from "react";
import { useTable } from "react-table";

function ArtistsTable({ data }) {
	//table headers
	const columns = useMemo(
		() => [
			{
				Header: "Rank",
				accessor: "rank",
			},
			{
				Header: "Image",
				accessor: "image",

				Cell: (cell) => (
					<div className="blog-comments__avatar mr-3">
						<img src={cell.cell.value} alt={cell.name} className="albumCover" />
					</div>
				),
			},
			{
				Header: "Name",
				accessor: "name",
			},
			{
				Header: "Genre",
				accessor: "genre",
			},
			{
				Header: "Followers",
				accessor: "followers",
				Cell: (cell) => (
					<div className="blog-comments__avatar mr-3">
						{new Intl.NumberFormat().format(cell.value)}
					</div>
				),
			},
			{
				Header: "Popularity Score",
				accessor: "popularity",
				Cell: (cell) => (
					<div className="blog-comments__avatar mr-3">{cell.value}/100</div>
				),
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

export default ArtistsTable;
