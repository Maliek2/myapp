import { h } from 'preact';
import objstr from 'obj-str';

import styles from './candidateTable.css';

const numberFormatter = new Intl.NumberFormat('en-US');
const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 1,
});
const shortParty = (party) => {
  switch (party) {
    case 'Republican':
      return 'Rep.';
    case 'Democrat':
      return 'Dem.';
    case 'Independent':
      return 'Ind.';
    default:
      return '-';
  }
};

const Candidate = ({ victor, name, party, votes, percent }) => {
  return (
    <tr>
      <td>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          class={objstr({
            [styles.victor]: true,
            [styles.displayVictor]: victor,
          })}
        >
          <path d="M20.285 2L9 13.567 3.714 8.556 0 12.272 9 21 24 5.715z" />
        </svg>
        <span class={styles.name}>{name}</span>
      </td>
      <td>
        <span class={styles.party}>{party}</span>
        <span
          class={objstr({
            [styles.party]: true,
            [styles.shortParty]: true,
          })}
        >
          {shortParty(party)}
        </span>
      </td>
      <td>
        <span class={styles.votes}>{numberFormatter.format(votes)}</span>
      </td>
      <td>
        <span class={styles.percent}>{percentFormatter.format(percent)}</span>
      </td>
    </tr>
  );
};

export const CandidateTable = ({ victor, totalData, regionData, votes, focusedRegion }) => {
  const focusedRegionData = focusedRegion !== null && regionData[focusedRegion].candidates;
  const winnerIndex = focusedRegionData && focusedRegionData.indexOf(Math.max(...focusedRegionData));
  return (
    <table>
      <thead>
        <tr>
          <th class={styles.name}>Candidate</th>
          <th class={styles.party}>Party</th>
          <th class={styles.votes}>Votes</th>
          <th class={styles.percent}>Pct.</th>
        </tr>
      </thead>
      <tbody>
        {totalData.map((candidate, index) => {
          const isVictor = focusedRegion !== null ? winnerIndex === index : candidate.victor;
          return (
            <Candidate victor={isVictor} name={candidate.name} party={candidate.party} votes={candidate.votes} percent={candidate.votes / votes} />
          );
        })}
      </tbody>
    </table>
  );
};
