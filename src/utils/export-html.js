export default function getHtmlTable() {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || {};
  const data = expenses.data;
  return `
    <table>
    <tr>
          <th>No.</th>
          <th>Date</th>
          <th>Descriptions</th>
          <th>Invoice No.</th>
          <th>Amount ($)</th>
    </tr>
    ${data.map((i) => (`
      <tr>
        <th>${i.id}</th>
        <th>${i.date}</th>
        <th>${i.description}</th>
        <th>${i.invoiceNo}</th>
        <th>${i.amount}</th>
      </tr>
    `))}
    <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>Total</td>
          <td>${data.reduce((acc, cur) => acc + parseInt(cur.amount), 0)}</td>
        </tr>
    </table>
    `;
}
