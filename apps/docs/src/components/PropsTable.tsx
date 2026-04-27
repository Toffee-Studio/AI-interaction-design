'use client'

import React from 'react'
import { t } from '@/theme'

interface PropRow {
  name: string
  type: string
  defaultVal: string
  description: string
}

interface PropsTableProps {
  rows: PropRow[]
}

const cellStyle: React.CSSProperties = {
  padding: '10px 16px',
  borderBottom: `1px solid ${t.borderCard}`,
  fontSize: 13,
  verticalAlign: 'top',
}

export function PropsTable({ rows }: PropsTableProps) {
  return (
    <div
      style={{
        background: t.bgCard,
        border: `1px solid ${t.borderCard}`,
        borderRadius: t.radius,
        overflow: 'hidden',
        marginTop: 12,
        marginBottom: 24,
      }}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 13,
        }}
      >
        <thead>
          <tr style={{ background: 'rgba(0,0,0,0.02)' }}>
            <th style={{ ...cellStyle, fontWeight: 600, textAlign: 'left', color: t.textSecondary }}>
              Prop
            </th>
            <th style={{ ...cellStyle, fontWeight: 600, textAlign: 'left', color: t.textSecondary }}>
              Type
            </th>
            <th style={{ ...cellStyle, fontWeight: 600, textAlign: 'left', color: t.textSecondary }}>
              Default
            </th>
            <th style={{ ...cellStyle, fontWeight: 600, textAlign: 'left', color: t.textSecondary }}>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td style={{ ...cellStyle, color: t.accent, fontFamily: t.fontMono, fontSize: 12 }}>
                {row.name}
              </td>
              <td style={{ ...cellStyle, color: t.textMuted, fontFamily: t.fontMono, fontSize: 12 }}>
                {row.type}
              </td>
              <td style={{ ...cellStyle, color: t.textMuted, fontFamily: t.fontMono, fontSize: 12 }}>
                {row.defaultVal}
              </td>
              <td style={{ ...cellStyle, color: t.textSecondary }}>
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
