export default {
  getPostColor: author => {
    if (!author) return '#65587f'
    const colorMap = {
      teacher: '#d45079',
      student: '#2196f3',
      parent: '#ea9085'
    }
    return colorMap[author.type] || '#65587f'
  },
  getPostTimestamp: timestamp => {
    const postTime = new Date(timestamp)
    const diffSec = (Date.now() - postTime.getTime()) / 1000

    if (diffSec < 60) return 'Just now'
    if (diffSec < 60 * 2) return '1 min ago'
    if (diffSec < 60 * 60) return `${parseInt(diffSec / 60)} mins ago`
    if (diffSec < 60 * 60 * 2) return '1 hour ago'
    if (diffSec < 60 * 60 * 24) return `${parseInt(diffSec / (60 * 60))} hours ago`
    if (diffSec < 60 * 60 * 24 * 2) return '1 day ago'
    if (diffSec < 60 * 60 * 24 * 30) return `${parseInt(diffSec / (60 * 60 * 24))} days ago`
    return postTime.toLocaleDateString('en-GB')
  }
}
