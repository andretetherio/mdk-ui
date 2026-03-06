/* eslint-disable ts/ban-ts-comment */
import { UNITS } from '@mining-sdk/core'
import {
  formatPowerConsumption,
  getCabinetTitle,
  getConfig,
  getHashrateString,
  getHashrateUnit,
  getLast,
  getLvCabinetTempSensorColor,
  getLvCabinetTitle,
  getMinerName,
  getOnOffText,
  getPowerModeColor,
  getRootTempSensorTempValue,
  getSnap,
  getStats,
  getTransformerCabinetTitle,
  isMinerOffline,
  isTransformerCabinet,
  megaToTera,
  MinerStatuses,
  PowerModeColors,
} from '../device-utils'
import { describe, expect, it } from 'vitest'

describe('device utils', () => {
  describe('formatHashRate', () => {
    it('should calculate properly', () => {
      expect(getHashrateUnit(0)).toEqual({ unit: 'MH/s', value: 0, realValue: 0 })
      expect(getHashrateUnit(0, 2, null, true)).toEqual({ unit: '', value: null, realValue: 0 })

      expect(getHashrateUnit(1)).toEqual({ unit: 'MH/s', value: 1, realValue: 1 })
      expect(getHashrateUnit(10)).toEqual({ unit: 'MH/s', value: 10, realValue: 10 })
      expect(getHashrateUnit(100)).toEqual({ unit: 'MH/s', value: 100, realValue: 100 })

      expect(getHashrateUnit(1.5789)).toEqual({ unit: 'MH/s', value: 1.58, realValue: 1.5789 })
      expect(getHashrateUnit(10.54987)).toEqual({ unit: 'MH/s', value: 10.55, realValue: 10.54987 })
      expect(getHashrateUnit(100.458798794)).toEqual({
        unit: 'MH/s',
        value: 100.46,
        realValue: 100.458798794,
      })

      expect(getHashrateUnit(1_000)).toEqual({ unit: 'GH/s', value: 1, realValue: 1_000 })
      expect(getHashrateUnit(10_000)).toEqual({ unit: 'GH/s', value: 10, realValue: 10_000 })
      expect(getHashrateUnit(100_000)).toEqual({ unit: 'GH/s', value: 100, realValue: 100_000 })

      expect(getHashrateUnit(1_000.98977)).toEqual({
        unit: 'GH/s',
        value: 1,
        realValue: 1_000.98977,
      })
      expect(getHashrateUnit(10_000.44477)).toEqual({
        unit: 'GH/s',
        value: 10,
        realValue: 10_000.44477,
      })
      expect(getHashrateUnit(15_427.44477)).toEqual({
        unit: 'GH/s',
        value: 15.43,
        realValue: 15_427.44477,
      })
      expect(getHashrateUnit(137_557.199887)).toEqual({
        unit: 'GH/s',
        value: 137.56,
        realValue: 137_557.199887,
      })

      expect(getHashrateUnit(1_000_000)).toEqual({ unit: 'TH/s', value: 1, realValue: 1_000_000 })
      expect(getHashrateUnit(10_000_000)).toEqual({
        unit: 'TH/s',
        value: 10,
        realValue: 10_000_000,
      })
      expect(getHashrateUnit(100_000_000)).toEqual({
        unit: 'TH/s',
        value: 100,
        realValue: 100_000_000,
      })

      expect(getHashrateUnit(1_557_000)).toEqual({
        unit: 'TH/s',
        value: 1.56,
        realValue: 1_557_000,
      })
      expect(getHashrateUnit(10_981_000)).toEqual({
        unit: 'TH/s',
        value: 10.98,
        realValue: 10_981_000,
      })
      expect(getHashrateUnit(100_144_000)).toEqual({
        unit: 'TH/s',
        value: 100.14,
        realValue: 100_144_000,
      })

      expect(getHashrateUnit(1_000_000_000)).toEqual({
        unit: 'PH/s',
        value: 1,
        realValue: 1_000_000_000,
      })
      expect(getHashrateUnit(10_000_000_000)).toEqual({
        unit: 'PH/s',
        value: 10,
        realValue: 10_000_000_000,
      })
      expect(getHashrateUnit(100_000_000_000)).toEqual({
        unit: 'PH/s',
        value: 100,
        realValue: 100_000_000_000,
      })

      expect(getHashrateUnit(1_669_474_000)).toEqual({
        unit: 'PH/s',
        value: 1.67,
        realValue: 1_669_474_000,
      })
      expect(getHashrateUnit(11_656_000_000)).toEqual({
        unit: 'PH/s',
        value: 11.66,
        realValue: 11_656_000_000,
      })
      expect(getHashrateUnit(995_427_000_000)).toEqual({
        unit: 'PH/s',
        value: 995.43,
        realValue: 995_427_000_000,
      })

      expect(getHashrateUnit(1_669_474_000_000)).toEqual({
        unit: 'EH/s',
        value: 1.67,
        realValue: 1_669_474_000_000,
      })
      expect(getHashrateUnit(11_656_000_000_000)).toEqual({
        unit: 'EH/s',
        value: 11.66,
        realValue: 11_656_000_000_000,
      })
      expect(getHashrateUnit(995_427_000_000_000)).toEqual({
        unit: 'EH/s',
        value: 995.43,
        realValue: 995_427_000_000_000,
      })
    })
  })

  describe('formatPowerConsumption', () => {
    describe('auto-selection behavior (default, no forceUnit)', () => {
      it('should return watts for values less than 1000', () => {
        expect(formatPowerConsumption(0)).toEqual({
          value: 0,
          unit: UNITS.POWER_W,
          realValue: 0,
        })
        expect(formatPowerConsumption(100)).toEqual({
          value: 100,
          unit: UNITS.POWER_W,
          realValue: 100,
        })
        expect(formatPowerConsumption(999)).toEqual({
          value: 999,
          unit: UNITS.POWER_W,
          realValue: 999,
        })
      })

      it('should return kW for values between 1000 and 999999', () => {
        expect(formatPowerConsumption(1000)).toEqual({
          value: 1,
          unit: UNITS.POWER_KW,
          realValue: 1000,
        })
        expect(formatPowerConsumption(5000)).toEqual({
          value: 5,
          unit: UNITS.POWER_KW,
          realValue: 5000,
        })
        expect(formatPowerConsumption(999999)).toEqual({
          value: 999.999,
          unit: UNITS.POWER_KW,
          realValue: 999999,
        })
      })

      it('should return MW for values >= 1000000', () => {
        expect(formatPowerConsumption(1000000)).toEqual({
          value: 1,
          unit: UNITS.ENERGY_MW,
          realValue: 1000000,
        })
        expect(formatPowerConsumption(5000000)).toEqual({
          value: 5,
          unit: UNITS.ENERGY_MW,
          realValue: 5000000,
        })
        expect(formatPowerConsumption(15000000)).toEqual({
          value: 15,
          unit: UNITS.ENERGY_MW,
          realValue: 15000000,
        })
      })

      it('should handle negative values correctly', () => {
        expect(formatPowerConsumption(-100)).toEqual({
          value: -100,
          unit: UNITS.POWER_W,
          realValue: -100,
        })
        expect(formatPowerConsumption(-5000)).toEqual({
          value: -5,
          unit: UNITS.POWER_KW,
          realValue: -5000,
        })
        expect(formatPowerConsumption(-2000000)).toEqual({
          value: -2,
          unit: UNITS.ENERGY_MW,
          realValue: -2000000,
        })
      })
    })

    describe('forced unit conversion', () => {
      it('should force MW conversion regardless of value', () => {
        expect(formatPowerConsumption(100, UNITS.ENERGY_MW)).toEqual({
          value: 0.0001,
          unit: UNITS.ENERGY_MW,
          realValue: 100,
        })
        expect(formatPowerConsumption(5000, UNITS.ENERGY_MW)).toEqual({
          value: 0.005,
          unit: UNITS.ENERGY_MW,
          realValue: 5000,
        })
        expect(formatPowerConsumption(2000000, UNITS.ENERGY_MW)).toEqual({
          value: 2,
          unit: UNITS.ENERGY_MW,
          realValue: 2000000,
        })
      })

      it('should force kW conversion regardless of value', () => {
        expect(formatPowerConsumption(100, UNITS.POWER_KW)).toEqual({
          value: 0.1,
          unit: UNITS.POWER_KW,
          realValue: 100,
        })
        expect(formatPowerConsumption(5000, UNITS.POWER_KW)).toEqual({
          value: 5,
          unit: UNITS.POWER_KW,
          realValue: 5000,
        })
        expect(formatPowerConsumption(2000000, UNITS.POWER_KW)).toEqual({
          value: 2000,
          unit: UNITS.POWER_KW,
          realValue: 2000000,
        })
      })

      it('should force W conversion regardless of value', () => {
        expect(formatPowerConsumption(100, UNITS.POWER_W)).toEqual({
          value: 100,
          unit: UNITS.POWER_W,
          realValue: 100,
        })
        expect(formatPowerConsumption(5000, UNITS.POWER_W)).toEqual({
          value: 5000,
          unit: UNITS.POWER_W,
          realValue: 5000,
        })
        expect(formatPowerConsumption(2000000, UNITS.POWER_W)).toEqual({
          value: 2000000,
          unit: UNITS.POWER_W,
          realValue: 2000000,
        })
      })
    })

    describe('edge cases', () => {
      it('should handle non-finite values', () => {
        // @ts-ignore
        expect(formatPowerConsumption(null)).toEqual({
          value: null,
          unit: '',
          realValue: null,
        })
        // @ts-ignore
        expect(formatPowerConsumption(undefined)).toEqual({
          value: null,
          unit: '',
          realValue: undefined,
        })
        expect(formatPowerConsumption(Number.NaN)).toEqual({
          value: null,
          unit: '',
          realValue: Number.NaN,
        })
        expect(formatPowerConsumption(Infinity)).toEqual({
          value: null,
          unit: '',
          realValue: Infinity,
        })
        expect(formatPowerConsumption(-Infinity)).toEqual({
          value: null,
          unit: '',
          realValue: -Infinity,
        })
      })

      it('should handle boundary values', () => {
        expect(formatPowerConsumption(999)).toEqual({
          value: 999,
          unit: UNITS.POWER_W,
          realValue: 999,
        })
        expect(formatPowerConsumption(1000)).toEqual({
          value: 1,
          unit: UNITS.POWER_KW,
          realValue: 1000,
        })
        expect(formatPowerConsumption(999999)).toEqual({
          value: 999.999,
          unit: UNITS.POWER_KW,
          realValue: 999999,
        })
        expect(formatPowerConsumption(1000000)).toEqual({
          value: 1,
          unit: UNITS.ENERGY_MW,
          realValue: 1000000,
        })
      })

      it('should preserve realValue when forcing unit', () => {
        const result = formatPowerConsumption(5000, UNITS.ENERGY_MW)
        expect(result.realValue).toBe(5000)
        expect(result.value).toBe(0.005)
        expect(result.unit).toBe(UNITS.ENERGY_MW)
      })
    })
  })

  describe('isMinerOffline', () => {
    it('should detect status properly', () => {
      expect(
        isMinerOffline({
          last: {
            snap: {
              stats: {
                status: 'offline',
              },
              config: {
                key1: 'val1',
              },
            },
          },
        }),
      ).toBe(true)

      expect(
        isMinerOffline({
          last: {
            snap: {
              stats: {
                status: 'other',
              },
              config: {
                key1: 'val1',
              },
            },
          },
        }),
      ).toBe(false)
    })

    it('should detect status properly when no config', () => {
      expect(
        isMinerOffline({
          last: {
            snap: {
              stats: {
                status: 'offline',
              },
              config: {},
            },
          },
        }),
      ).toBe(true)

      expect(
        isMinerOffline({
          last: {
            snap: {
              stats: {
                status: 'offline',
              },
            },
          },
        }),
      ).toBe(true)
    })

    it('should detect status when no stats', () => {
      expect(
        isMinerOffline({
          last: {
            snap: {
              config: {
                key1: 'val1',
              },
            },
          },
        }),
      ).toBe(false)

      expect(
        isMinerOffline({
          last: {
            snap: {
              stats: {},
              config: {
                key1: 'val1',
              },
            },
          },
        }),
      ).toBe(false)
    })

    it('should detect status when no stats and no config', () => {
      expect(
        isMinerOffline({
          last: {
            snap: {},
          },
        }),
      ).toBe(true)
    })
  })

  describe('getHashrateString', () => {
    it('should return formatted hashrate', () => {
      const cases: Record<number, string> = {
        1e6: '1 TH/s',
        6e6: '6 TH/s',
        6e5: '600 GH/s',
        6e2: '600 MH/s',
        6e1: '60 MH/s',
        6.6e1: '66 MH/s',
      }
      for (const testCase in cases) {
        if (!Object.hasOwn(cases, testCase)) continue

        const expected = cases[testCase]
        expect(getHashrateString(Number.parseInt(testCase))).toBe(expected)
      }
    })

    it('should treat 0 as no data', () => {
      expect(getHashrateString(0, true)).toBe('-')
    })

    it('should treat 0 as data', () => {
      expect(getHashrateString(0)).toBe('0 MH/s')
    })
  })

  describe('megaToTera', () => {
    it('should format properly', () => {
      const cases: Record<number, number> = {
        1e6: 1,
        6e6: 6,
        6e5: 0.6,
        6.3e5: 0.63,
      }

      for (const testCase in cases) {
        if (!Object.hasOwn(cases, testCase)) continue

        const expected = cases[testCase]
        expect(megaToTera(Number.parseInt(testCase))).toBe(expected)
      }
    })
  })

  describe('getOnOffText', () => {
    it('should return correct text', () => {
      expect(getOnOffText(true)).toBe('On')
      expect(getOnOffText(false)).toBe('Off')
      expect(getOnOffText(null)).toBe('-')
      expect(getOnOffText(null, 'x')).toBe('x')
    })
  })

  describe('cabinet utils', () => {
    it('should detect transformer cabinet', () => {
      expect(isTransformerCabinet({ id: 'tr-1' })).toBe(true)
      expect(isTransformerCabinet({ id: 'tr-cabinet-01' })).toBe(true)
      expect(isTransformerCabinet({ id: 'lv-1' })).toBe(false)
      expect(isTransformerCabinet({ id: 'cabinet' })).toBe(false)
    })

    it('should get transformer cabinet title', () => {
      expect(
        getTransformerCabinetTitle({ id: 'tr-1', connectedDevices: ['c-1', 'c-2'] }),
      ).toContain('TR')
      expect(getTransformerCabinetTitle({ id: 'tr-01' })).toContain('TR')
    })

    it('should get LV cabinet title', () => {
      expect(getLvCabinetTitle({ id: 'lv-1' })).toBe('LV Cabinet -1')
      expect(getLvCabinetTitle({ id: 'lv-cabinet-02' })).toContain('LV Cabinet')
    })

    it('should get correct cabinet title based on type', () => {
      expect(getCabinetTitle({ id: 'tr-1' })).toContain('TR')
      expect(getCabinetTitle({ id: 'lv-1' })).toContain('LV Cabinet')
    })

    it('should get LV cabinet temp sensor color', () => {
      expect(getLvCabinetTempSensorColor(75)).toBeTruthy()
      expect(getLvCabinetTempSensorColor(65)).toBeTruthy()
      expect(getLvCabinetTempSensorColor(50)).toBe('')
    })
  })

  describe('device data accessors', () => {
    it('should get last data', () => {
      expect(getLast({ last: { value: 1 } })).toEqual({ value: 1 })
      expect(getLast({})).toEqual({})
      expect(getLast({ other: 'data' })).toEqual({})
    })

    it('should get snap data', () => {
      expect(getSnap({ last: { snap: { temp: 50 } } })).toEqual({ temp: 50 })
      expect(getSnap({})).toEqual({})
    })

    it('should get stats data', () => {
      expect(getStats({ last: { snap: { stats: { power: 100 } } } })).toEqual({ power: 100 })
      expect(getStats({})).toEqual({})
    })

    it('should get config data', () => {
      expect(getConfig({ last: { snap: { config: { mode: 'high' } } } })).toEqual({ mode: 'high' })
      expect(getConfig({})).toEqual({})
    })

    it('should get root temp sensor value', () => {
      const device = {
        rootTempSensor: {
          last: {
            snap: {
              stats: { temp_c: 45.5 },
            },
          },
        },
      }
      expect(getRootTempSensorTempValue(device)).toBe(45.5)
      expect(getRootTempSensorTempValue({})).toBeUndefined()
    })
  })

  describe('power mode', () => {
    it('should have power mode colors', () => {
      expect(PowerModeColors.sleep).toBeDefined()
      expect(PowerModeColors.low).toBeDefined()
      expect(PowerModeColors.normal).toBeDefined()
      expect(PowerModeColors.high).toBeDefined()
    })

    it('should get power mode color', () => {
      expect(getPowerModeColor('sleep')).toBeDefined()
      expect(getPowerModeColor('high')).toBeDefined()
    })
  })

  describe('miner name', () => {
    it('should get miner name from type', () => {
      const name = getMinerName('miner-am-s19')
      expect(name).toBeTruthy()
      expect(typeof name).toBe('string')
    })
  })

  describe('miner statuses', () => {
    it('should have all miner status types', () => {
      expect(MinerStatuses.MINING).toBe('mining')
      expect(MinerStatuses.OFFLINE).toBe('offline')
      expect(MinerStatuses.SLEEPING).toBe('sleeping')
      expect(MinerStatuses.ERROR).toBe('error')
      expect(MinerStatuses.NOT_MINING).toBe('not_mining')
      expect(MinerStatuses.MAINTENANCE).toBe('maintenance')
      expect(MinerStatuses.ALERT).toBe('alert')
    })

    it('should have lowercase status values', () => {
      Object.values(MinerStatuses).forEach((status) => {
        expect(status).toBe(status.toLowerCase())
      })
    })

    it('should have all expected statuses', () => {
      const statuses = Object.values(MinerStatuses)
      expect(statuses).toHaveLength(7)
    })

    it('should have operational and non-operational statuses', () => {
      const statuses = Object.values(MinerStatuses)
      expect(statuses).toContain('mining')
      expect(statuses).toContain('offline')
      expect(statuses).toContain('sleeping')
      expect(statuses).toContain('error')
    })
  })

  describe('isMinerOffline advanced cases', () => {
    it('should detect offline by status', () => {
      const device = {
        last: {
          snap: {
            stats: { status: 'offline' },
            config: { mode: 'normal' },
          },
        },
      }
      expect(isMinerOffline(device)).toBe(true)
    })

    it('should detect offline by empty stats and config', () => {
      const device = {
        last: {
          snap: {
            stats: {},
            config: {},
          },
        },
      }
      expect(isMinerOffline(device)).toBe(true)
    })

    it('should not be offline with stats and config present', () => {
      const device = {
        last: {
          snap: {
            stats: { status: 'mining', power: 100 },
            config: { mode: 'normal' },
          },
        },
      }
      expect(isMinerOffline(device)).toBe(false)
    })
  })
})
