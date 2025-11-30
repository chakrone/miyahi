class TeamService {
  async getTeamMembers() {
    // Normally: fetch from DB
    return [
      { name: 'John Doe', role: 'Project Lead' },
      { name: 'Jane Smith', role: 'Backend Developer' },
      { name: 'Alice Brown', role: 'Frontend Developer' }
    ];
  }
}

module.exports = new TeamService();
