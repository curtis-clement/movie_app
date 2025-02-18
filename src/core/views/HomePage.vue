<template>
  <div class="home-container">
    <h1>Welcome to ShowsBiz</h1>
    <div class="content">
      <p>Your destination for exploring TV shows, viewing cast information, and discovering new series to watch.</p>
      <div class="features">
        <h2>What you can do here:</h2>
        <ul>
          <li>Search for your favorite TV shows</li>
          <li>View cast information for each show</li>
          <li>Discover new series based on your interests</li>
          <li>View show details and summaries</li>
          <li>View Episode information (Coming Soon)</li>
          <li>View Season information (Coming Soon)</li>
        </ul>
      </div>
      <div class="attribution">
        Powered by <a href="https://www.tvmaze.com" target="_blank" rel="noopener">TVmaze.com</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  margin: 0 auto;
  max-width: 800px;
  padding: 2rem;
  text-align: center;
}

.content {
  margin-top: 2rem;
}

h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

p {
  color: #666;
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.features {
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 2rem;
  padding: 2rem;
  text-align: left;
}

.features h2 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.features ul {
  list-style-type: none;
  padding: 0;
}

.features li {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.features li::before {
  color: #42b883;
  content: "•";
  left: 0;
  position: absolute;
}

.attribution {
  color: #666;
  font-size: 0.9rem;
  margin-top: 3rem;
}

.attribution a {
  color: #42b883;
  text-decoration: none;
}

.attribution a:hover {
  text-decoration: underline;
}
</style>