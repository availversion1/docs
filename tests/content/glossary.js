import loadSiteData from '../../lib/site-data.js'

describe('glossaries', () => {
  const glossaries = loadSiteData().en.site.data.glossaries

  test('are broken into external, internal, and candidates', async () => {
    const keys = Object.keys(glossaries)
    expect(keys).toHaveLength(3)
    expect(keys).toContain('candidates')
    expect(keys).toContain('external')
    expect(keys).toContain('internal')
  })

  test('every entry has a valid term', async () => {
    function hasValidTerm(entry) {
      return entry.term && entry.term.length && !entry.term.includes('*')
    }

    expect(glossaries.external.every(hasValidTerm)).toBe(true)
    expect(glossaries.internal.every(hasValidTerm)).toBe(true)
    expect(glossaries.candidates.every(hasValidTerm)).toBe(true)
  })

  test('external glossary has entries, and they all have descriptions', async () => {
    expect(glossaries.external.length).toBeGreaterThan(20)
    glossaries.external.forEach((entry) => {
      const message = `entry '${entry.term}' is missing a description`
      expect(entry.description && entry.description.length > 0, message).toBe(true)
    })
  })

  test('internal glossary has entries, and they all have descriptions', async () => {
    expect(glossaries.internal.length).toBeGreaterThan(20)
    glossaries.internal.forEach((entry) => {
      const message = `entry '${entry.term}' is missing a description`
      expect(entry.description && entry.description.length > 0, message).toBe(true)
    })
  })

  test('candidates all have a term, but no description', async () => {
    expect(glossaries.candidates.length).toBeGreaterThan(20)
    glossaries.candidates.forEach((entry) => {
      const message = `entry '${entry.term}' not expected to have a description`
      expect(!entry.description, message).toBe(true)
    })
  })
})
