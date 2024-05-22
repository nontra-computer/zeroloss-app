import React from 'react'

interface TableChartProps {
	data: any[]
	parameters: any[]
	average: { paramName: string; average: string }[]
}

const TableChart: React.FC<TableChartProps> = ({ data, parameters, average }) => {
	return (
		<>
			<style>
				{`
      table {
        width: 100%;
        border-collapse: collapse;
      }

    
      tbody td {
        padding: 8px;
        border: 1px solid #ddd;
      }

      tbody tr:nth-child(odd) {
        background-color: #f9f9f9; /* Light gray */
      }

      tbody tr:nth-child(even) {
        background-color: #fff; /* White */
      }

      /* Styles for the last six rows */
      .special-row:nth-child(odd) {
        background-color: #788ca2; /* Light blue */
      }

      .special-row:nth-child(even) {
        background-color: #b3e0ff ; /* Light gray */
      }
    `}
			</style>
			<table>
				<thead>
					<tr>
						<th>Date Time</th>
						{parameters.map(param => (
							<th key={param.id}>{param.name}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((row, index) => (
						<tr key={index}>
							<td>{row.date}</td>
							{parameters.map(param => (
								<td key={param.id}>{row[`p_${param.name}`]}</td>
							))}
						</tr>
					))}
					<tr className="special-row">
						<td>Average</td>
						{average.map((avg, index) => (
							<td key={index}>{avg.average}</td>
						))}
					</tr>
					<tr className="special-row">
						<td>Standard</td>
						{parameters.map(param => (
							<td key={param.id}>1.00</td>
						))}
					</tr>
					<tr className="special-row">
						<td>Min</td>
						{parameters.map(param => (
							<td key={param.id}></td>
						))}
					</tr>
					<tr className="special-row">
						<td>Max</td>
						{parameters.map(param => (
							<td key={param.id}></td>
						))}
					</tr>
					<tr className="special-row">
						<td>Data Number</td>
						{parameters.map(param => (
							<td key={param.id}>0</td>
						))}
					</tr>
					<tr className="special-row">
						<td>% Data</td>
						{parameters.map(param => (
							<td key={param.id}>0.00%</td>
						))}
					</tr>
				</tbody>
			</table>
		</>
	)
}

export default TableChart
