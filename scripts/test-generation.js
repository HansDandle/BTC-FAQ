const AutoBlogger = require('./AutoBlogger');

async function testGeneration() {
  console.log('🧪 Testing AI blog post generation...');
  
  const blogger = new AutoBlogger();
  
  try {
    const result = await blogger.generateWeeklyPost();
    console.log('✅ Test successful!');
    console.log(`📝 Generated post about: ${result.topic}`);
    console.log(`📄 Filename: ${result.filename}`);
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

if (require.main === module) {
  testGeneration();
}

module.exports = testGeneration;