export type SnapshotId = 'hcp-ipc-2026-10' | 'hcp-ipc-method-2017'
export type DataPointId =
  | 'ipc-national-yoy-2026-10'
  | 'food-yoy-2026-10'
  | 'transport-yoy-2026-10'
  | 'vegetables-mom-2026-10'
  | 'food-weight-2017'

export type DataSnapshot = {
  id: SnapshotId
  publisher: string
  title: string
  url: string
  publicationDate: string
  retrievedAt: string
  status: 'verified'
}

export type DataPoint = {
  id: DataPointId
  snapshotId: SnapshotId
  series: string
  value: number
  unit: '%' | '% du panier'
  geography: string
  referencePeriod: string
  comparisonPeriod: string
  comparison: 'year-over-year' | 'month-over-month' | 'basket-weight'
}

export const dataSnapshots: Record<SnapshotId, DataSnapshot> = {
  'hcp-ipc-2026-10': {
    id: 'hcp-ipc-2026-10',
    publisher: 'Haut-Commissariat au Plan',
    title: 'Indice des prix à la consommation — octobre 2026',
    url: 'https://www.hcp.ma/L-Indice-des-prix-a-la-consommation-IPC-du-mois-d-octobre-2026_a4369.html',
    publicationDate: '2026-11-20',
    retrievedAt: '2026-11-24',
    status: 'verified',
  },
  'hcp-ipc-method-2017': {
    id: 'hcp-ipc-method-2017',
    publisher: 'Haut-Commissariat au Plan',
    title: 'L’inflation : comment elle est calculée et de quoi est composé le panier de référence',
    url: 'https://www.hcp.ma/L-inflation-comment-elle-est-calculee-de-quoi-est-compose-le-panier-de-reference_a3701.html',
    publicationDate: '2023-04-17',
    retrievedAt: '2026-11-24',
    status: 'verified',
  },
}

export const dataPoints: Record<DataPointId, DataPoint> = {
  'ipc-national-yoy-2026-10': {
    id: 'ipc-national-yoy-2026-10', snapshotId: 'hcp-ipc-2026-10',
    series: 'Indice des prix à la consommation, ensemble', value: 1.9, unit: '%',
    geography: 'Maroc', referencePeriod: '2026-10', comparisonPeriod: '2025-10', comparison: 'year-over-year',
  },
  'food-yoy-2026-10': {
    id: 'food-yoy-2026-10', snapshotId: 'hcp-ipc-2026-10',
    series: 'Produits alimentaires', value: 0.3, unit: '%',
    geography: 'Maroc', referencePeriod: '2026-10', comparisonPeriod: '2025-10', comparison: 'year-over-year',
  },
  'transport-yoy-2026-10': {
    id: 'transport-yoy-2026-10', snapshotId: 'hcp-ipc-2026-10',
    series: 'Transport', value: 11.6, unit: '%',
    geography: 'Maroc', referencePeriod: '2026-10', comparisonPeriod: '2025-10', comparison: 'year-over-year',
  },
  'vegetables-mom-2026-10': {
    id: 'vegetables-mom-2026-10', snapshotId: 'hcp-ipc-2026-10',
    series: 'Légumes', value: 6.8, unit: '%',
    geography: 'Maroc', referencePeriod: '2026-10', comparisonPeriod: '2026-09', comparison: 'month-over-month',
  },
  'food-weight-2017': {
    id: 'food-weight-2017', snapshotId: 'hcp-ipc-method-2017',
    series: 'Pondération des produits alimentaires dans le panier IPC base 2017', value: 37.28,
    unit: '% du panier', geography: 'Maroc', referencePeriod: 'base 2017', comparisonPeriod: 'sans objet', comparison: 'basket-weight',
  },
}

export function snapshotFor(point: DataPoint): DataSnapshot {
  return dataSnapshots[point.snapshotId]
}

export function isReferencePeriodConsistent(snapshot: DataSnapshot, point: DataPoint): boolean {
  if (!/^\d{4}-\d{2}$/.test(point.referencePeriod)) return point.referencePeriod === 'base 2017'
  return point.referencePeriod <= snapshot.publicationDate.slice(0, 7)
}
