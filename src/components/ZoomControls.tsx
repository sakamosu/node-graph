import React from 'react'
import { colors } from '@/utils/colors'

interface ZoomControlsProps {
  onZoomIn: () => void
  onZoomOut: () => void
  onResetZoom: () => void
  scale: number
}

export const ZoomControls = React.memo<ZoomControlsProps>(function ZoomControls({
  onZoomIn,
  onZoomOut,
  onResetZoom,
  scale
}) {
  const buttonStyle = {
    width: '28px',
    height: '28px',
    border: `1px solid ${colors.ui.panel.border}`,
    borderRadius: '4px',
    backgroundColor: colors.ui.panel.background,
    color: colors.node.stroke.normal,
    fontSize: '16px',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s',
  }

  const containerStyle = {
    position: 'absolute' as const,
    bottom: '12px',
    right: '12px',
    display: 'flex',
    flexDirection: 'row' as const,
    gap: '4px',
    alignItems: 'center',
    backgroundColor: colors.ui.panel.background,
    border: `1px solid ${colors.ui.panel.border}`,
    borderRadius: '6px',
    padding: '4px',
    zIndex: 10,
  }

  const scaleDisplayStyle = {
    fontSize: '11px',
    color: colors.node.stroke.dimmed,
    textAlign: 'center' as const,
    minWidth: '35px',
    marginLeft: '4px',
  }

  return (
    <div style={containerStyle}>
      <button
        onClick={onZoomIn}
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = colors.node.background.highlighted
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = colors.ui.panel.background
        }}
        title="ズームイン"
      >
        +
      </button>
      <button
        onClick={onZoomOut}
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = colors.node.background.highlighted
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = colors.ui.panel.background
        }}
        title="ズームアウト"
      >
        −
      </button>
      <button
        onClick={onResetZoom}
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = colors.node.background.highlighted
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = colors.ui.panel.background
        }}
        title="ズームリセット"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M9 9L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M4 6H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
      <div style={scaleDisplayStyle}>
        {Math.round(scale * 100)}%
      </div>
    </div>
  )
})