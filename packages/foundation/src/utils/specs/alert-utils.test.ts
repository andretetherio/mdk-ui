import { describe, expect, it } from 'vitest'
import { getAlarms, getAlertsString, getSingleAlarmMessage } from '../alerts-utils'

describe('alert utils', () => {
  const getFormattedDate = (date: Date) => date.toISOString()
  describe('getAlarms', () => {
    it('should get alarms properly', () => {
      // vi.setSystemTime(new Date('2024-01-01'))

      const alerts = [
        {
          name: 'alert-1',
          description: 'alert 1',
          severity: 'high',
          createdAt: new Date('2024-01-01').toISOString(),
          message: 'message 1',
        },
        {
          name: 'alert-2',
          description: 'alert 2',
          severity: 'low',
          createdAt: new Date('2024-01-02').toISOString(),
          message: 'message 2',
        },
      ]
      const result = getAlarms(
        {
          id: 'dev-1',
          type: 'type-1',
          last: {
            alerts,
          },
        },
        false,
        getFormattedDate,
      )

      expect(result).toBe(alerts)
    })

    it('should format alarms properly', () => {
      const alerts = [
        {
          name: 'alert-1',
          description: 'alert 1',
          severity: 'high',
          createdAt: new Date('2024-01-01').toISOString(),
          message: 'message 1',
        },
        {
          name: 'alert-2',
          description: 'alert 2',
          severity: 'low',
          createdAt: new Date('2024-01-02').toISOString(),
          message: 'message 2',
        },
      ]

      const result = getAlarms(
        {
          id: 'dev-1',
          type: 'type-1',
          last: {
            alerts,
          },
        },
        true,
        getFormattedDate,
      )

      expect(typeof result).toBe('string')
      if (typeof result === 'string') {
        expect(result.split(',\n')).toEqual([
          '(high) 2024-01-01T00:00:00.000Z: alert-1 Description: alert 1 message 1',
          '(low) 2024-01-02T00:00:00.000Z: alert-2 Description: alert 2 message 2',
        ])
      }
    })
  })

  describe('getAlertsString', () => {
    it('should format alarms properly', () => {
      const alerts = [
        {
          name: 'alert-1',
          description: 'alert 1',
          severity: 'high',
          createdAt: new Date('2024-01-01').toISOString(),
          message: 'message 1',
        },
        {
          name: 'alert-2',
          description: 'alert 2',
          severity: 'low',
          createdAt: new Date('2024-01-02').toISOString(),
          message: 'message 2',
        },
      ]

      const result = getAlertsString(alerts, getFormattedDate)

      expect(typeof result).toBe('string')
      if (typeof result === 'string') {
        expect(result.split(',\n\n')).toEqual([
          '(high) 2024-01-01T00:00:00.000Z : alert-1 Description: alert 1 message 1',
          '(low) 2024-01-02T00:00:00.000Z : alert-2 Description: alert 2 message 2',
        ])
      }
    })

    it('should handle alerts without custom date formatter', () => {
      const alerts = [
        {
          name: 'alert-1',
          description: 'alert 1',
          severity: 'high',
          createdAt: new Date('2024-01-01').toISOString(),
          message: 'message 1',
        },
      ]

      const result = getAlertsString(alerts)
      expect(typeof result).toBe('string')
      expect(result).toContain('alert-1')
      expect(result).toContain('alert 1')
    })

    it('should handle alerts without message', () => {
      const alerts = [
        {
          name: 'alert-1',
          description: 'alert 1',
          severity: 'high',
          createdAt: new Date('2024-01-01').toISOString(),
        },
      ]

      const result = getAlertsString(alerts, getFormattedDate)
      expect(typeof result).toBe('string')
      expect(result).toContain('alert-1')
    })
  })

  describe('getSingleAlarmMessage', () => {
    it('should format single alarm with custom date formatter', () => {
      const alarm = {
        name: 'critical-alarm',
        description: 'critical issue',
        severity: 'critical',
        createdAt: new Date('2024-01-01').toISOString(),
        message: 'urgent',
      }

      const result = getSingleAlarmMessage(alarm, getFormattedDate)
      expect(result).toContain('critical')
      expect(result).toContain('critical-alarm')
      expect(result).toContain('critical issue')
      expect(result).toContain('urgent')
      expect(result).toContain('2024-01-01T00:00:00.000Z')
    })

    it('should format single alarm without custom date formatter', () => {
      const alarm = {
        name: 'alarm',
        description: 'desc',
        severity: 'low',
        createdAt: new Date('2024-01-01').toISOString(),
        message: 'msg',
      }

      const result = getSingleAlarmMessage(alarm)
      expect(result).toContain('alarm')
      expect(result).toContain('desc')
      expect(result).toContain('low')
    })

    it('should handle alarm without message', () => {
      const alarm = {
        name: 'alarm',
        description: 'desc',
        severity: 'medium',
        createdAt: new Date('2024-01-01').toISOString(),
      }

      const result = getSingleAlarmMessage(alarm, getFormattedDate)
      expect(result).toContain('alarm')
      expect(result).toContain('desc')
      expect(result).not.toContain('undefined')
    })
  })

  describe('getAlarms edge cases', () => {
    it('should handle device without alerts', () => {
      const result = getAlarms({
        id: 'dev-1',
        type: 'type-1',
        last: {},
      })
      expect(result).toBeUndefined()
    })

    it('should handle empty device', () => {
      const result = getAlarms()
      expect(result).toBeUndefined()
    })

    it('should return alerts array when getString is false', () => {
      const alerts = [
        {
          name: 'alert',
          description: 'desc',
          severity: 'low',
          createdAt: new Date('2024-01-01').toISOString(),
        },
      ]

      const result = getAlarms(
        {
          id: 'dev-1',
          type: 'type-1',
          last: { alerts },
        },
        false,
      )

      expect(Array.isArray(result)).toBe(true)
      expect(result).toEqual(alerts)
    })

    it('should format multiple alarms as string', () => {
      const alerts = [
        {
          name: 'alert1',
          description: 'desc1',
          severity: 'high',
          createdAt: new Date('2024-01-01').toISOString(),
          message: 'msg1',
        },
        {
          name: 'alert2',
          description: 'desc2',
          severity: 'low',
          createdAt: new Date('2024-01-02').toISOString(),
          message: 'msg2',
        },
      ]

      const result = getAlarms(
        {
          id: 'dev-1',
          type: 'type-1',
          last: { alerts },
        },
        true,
        getFormattedDate,
      )

      expect(typeof result).toBe('string')
      if (typeof result === 'string') {
        expect(result).toContain('alert1')
        expect(result).toContain('alert2')
        expect(result.split(',\n')).toHaveLength(2)
      }
    })

    it('should handle single alarm in array', () => {
      const alerts = [
        {
          name: 'single-alert',
          description: 'single description',
          severity: 'medium',
          createdAt: new Date('2024-01-01').toISOString(),
        },
      ]

      const result = getAlarms(
        {
          id: 'dev-1',
          type: 'type-1',
          last: { alerts },
        },
        true,
        getFormattedDate,
      )

      expect(typeof result).toBe('string')
      if (typeof result === 'string') {
        expect(result).toContain('single-alert')
        expect(result).not.toContain(',\n')
      }
    })
  })
})
