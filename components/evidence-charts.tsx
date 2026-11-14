'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { chatbotFalsehoodRate, dependencyEffect, incidentsByCountry, threatShare, votingAnswers } from '@/lib/evidence'

const axisTick = { fill: 'var(--muted-foreground)', fontSize: 12 }
const tooltipStyle = {
  contentStyle: {
    background: 'var(--popover)',
    border: '1px solid var(--border)',
    borderRadius: 6,
    fontSize: 12,
    color: 'var(--foreground)',
  },
  itemStyle: { color: 'var(--foreground)' },
  labelStyle: { color: 'var(--muted-foreground)' },
  cursor: { fill: 'var(--muted)', opacity: 0.4 },
}

function HorizontalBars({
  data,
  dataKey,
  nameKey,
  suffix = '',
  max,
  height = 180,
  labelWidth = 140,
}: {
  data: Record<string, string | number | boolean>[]
  dataKey: string
  nameKey: string
  suffix?: string
  max?: number
  height?: number
  labelWidth?: number
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 48, bottom: 4, left: 0 }}>
        <CartesianGrid horizontal={false} stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, max ?? 'auto']} tick={axisTick} axisLine={false} tickLine={false} />
        <YAxis
          type="category"
          dataKey={nameKey}
          width={labelWidth}
          tick={axisTick}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip {...tooltipStyle} formatter={(v) => [`${v}${suffix}`, '']} separator="" />
        <Bar dataKey={dataKey} radius={[0, 3, 3, 0]} barSize={22}>
          {data.map((d, i) => (
            <Cell key={i} fill={d.estimated ? 'var(--muted-foreground)' : i === 0 ? 'var(--signal)' : 'var(--caution)'} />
          ))}
          <LabelList
            dataKey={dataKey}
            position="right"
            formatter={(v) => `${v}${suffix}`}
            style={{ fill: 'var(--foreground)', fontSize: 12 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function IncidentsByCountryChart() {
  return <HorizontalBars data={incidentsByCountry} dataKey="incidents" nameKey="country" labelWidth={110} />
}

export function ThreatShareChart() {
  return <HorizontalBars data={threatShare} dataKey="value" nameKey="label" suffix="%" max={100} labelWidth={170} />
}

export function ChatbotFalsehoodChart() {
  return (
    <HorizontalBars
      data={chatbotFalsehoodRate.slice().reverse()}
      dataKey="rate"
      nameKey="period"
      suffix="%"
      max={50}
      labelWidth={150}
    />
  )
}

export function VotingAnswersChart() {
  return <HorizontalBars data={votingAnswers} dataKey="value" nameKey="label" suffix="%" max={100} labelWidth={170} />
}

export function DependencyChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={dependencyEffect} margin={{ top: 24, right: 8, bottom: 4, left: -16 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis dataKey="label" tick={axisTick} axisLine={false} tickLine={false} />
        <YAxis domain={[-20, 30]} ticks={[-20, -10, 0, 10, 20, 30]} tick={axisTick} axisLine={false} tickLine={false} />
        <ReferenceLine y={0} stroke="var(--muted-foreground)" />
        <Tooltip {...tooltipStyle} formatter={(v) => [`${Number(v) > 0 ? '+' : ''}${v} pts`, '']} separator="" />
        <Bar dataKey="change" barSize={56} radius={3}>
          {dependencyEffect.map((d) => (
            <Cell key={d.label} fill={d.change >= 0 ? 'var(--verified)' : 'var(--signal)'} />
          ))}
          <LabelList
            dataKey="change"
            position="top"
            formatter={(v) => `${Number(v) > 0 ? '+' : ''}${v}`}
            style={{ fill: 'var(--foreground)', fontSize: 12 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
