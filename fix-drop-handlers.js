const fs = require('fs');
const path = require('path');

const files = [
  'WorkspaceLevel6.jsx',
  'WorkspaceLevel8.jsx',
  'WorkspaceLevel9.jsx',
  'WorkspaceLevel10.jsx'
];

const oldDrop = `  const handleDrop = (e) => {
    e.preventDefault()
    const componentData = JSON.parse(e.dataTransfer.getData('application/json'))
    const rect = workspaceRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - 50
    const y = e.clientY - rect.top - 50

    const tempId = Date.now()
    setComponentPositions(prev => ({
      ...prev,
      [tempId]: { x, y }
    }))

    onAddComponent(componentData)
  }`;

const newDrop = `  const handleDrop = (e) => {
    e.preventDefault()
    try {
      const componentData = JSON.parse(e.dataTransfer.getData('application/json'))
      const rect = workspaceRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - 50
      const y = e.clientY - rect.top - 50

      if (typeof window.currentLevelAddComponent === 'function') {
        window.currentLevelAddComponent({ ...componentData, _dropPosition: { x, y } })
      }
    } catch (err) {
      console.error('Drop error:', err)
    }
  }`;

files.forEach(file => {
  const filePath = path.join(__dirname, 'src', 'components', file);
  console.log(`Processing ${file}...`);

  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('onAddComponent(componentData)')) {
    content = content.replace(oldDrop, newDrop);

    // Also remove onAddComponent from props
    content = content.replace(/,\s*onAddComponent\s*(?=\n|})/g, '');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${file}`);
  } else {
    console.log(`⏭️  Skipped ${file} (already fixed or different pattern)`);
  }
});

console.log('\n✅ All files processed!');
