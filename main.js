window.onload = () => {
  const width = 30;
  const height = 30;
  const containerId = 'cells-container';
  const cellClassName = 'cell';
  const stopCheckboxId = 'stop-checkbox';

  const createInitialContainer = (width, height) => {
    const container = document.createElement('div');
    container.setAttribute('id', containerId);
    for(let y = 0; y < height; y++) {
      const div = document.createElement('div');
      div.setAttribute('class', `row-${y}`);
      for(let x = 0; x < width; x++) {
        const id = `cell-${x}-${y}`;
        const checked = Math.random() >= 0.5;
        const checkbox = createCheckbox(id, cellClassName, checked);
        div.appendChild(checkbox);
      }
      container.appendChild(div);
    }
    return container;
  }

  const createCheckbox = (id=null, klass=null, checked=false) => {
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = checked;
    if(id) checkbox.setAttribute('id', id);
    if(klass) checkbox.setAttribute('class', klass);
    return checkbox;
  };

  const calcNextContainer = () => {
    const container = document.createElement('div');
    container.setAttribute('id', containerId);
    for(let y = 0; y < height; y++) {
      const div = document.createElement('div');
      div.setAttribute('class', `row-${y}`);
      for(let x = 0; x < width; x++) {
        const id = `cell-${x}-${y}`;
        const checked = document.getElementById(id).checked;
        const count = countAround(x, y);
        const next = calcNextCell(checked, count);
        const checkbox = createCheckbox(id, cellClassName, next);
        div.appendChild(checkbox);
      }
      container.appendChild(div);
    }
    return container;
  };

  const calcNextCell = (self, count) => {
    if(self && count == 2 || count == 3) return true;
    if(self && count <= 1) return false;
    if(self && count >= 4) return false;
    if(count == 3) return true;
    return false;
  };

  const countAround = (centerX, centerY) => {
    let count = 0;
    for(let y = -1; y <= 1; y++) {
      for(let x = -1; x <= 1; x++) {
        const id = `cell-${x + centerX}-${y + centerY}`;
        const cell = document.getElementById(id);
        const isSelf = x == 0 && y == 0;
        if(cell && cell.checked && !isSelf) count++;
      }
    }
    return count;
  };

  const update = () => {
    const stopCheckbox = document.getElementById(stopCheckboxId);
    if(stopCheckbox.checked) return;
    const prevContainer = document.getElementById(containerId);
    const nextContainer = calcNextContainer();
    document.body.removeChild(prevContainer);
    document.body.appendChild(nextContainer);
  };

  const createStopUI = () => {
    const label = document.createElement('label');
    label.innerText = 'Stop!';
    document.body.appendChild(label);

    const stopCheckbox = document.createElement('input');
    stopCheckbox.checked = true;
    stopCheckbox.setAttribute('type', 'checkbox');
    stopCheckbox.setAttribute('id', stopCheckboxId);
    document.body.appendChild(stopCheckbox);
  };

  const createRefreshButton = () => {
    const refreshButton = document.createElement('button');
    refreshButton.innerText = 'Refresh!';
    refreshButton.onclick = () => {
      const prevContainer = document.getElementById(containerId);
      document.body.removeChild(prevContainer);
      const newContainer = createInitialContainer(width, height);
      document.body.appendChild(newContainer);
    };
    document.body.appendChild(refreshButton);
  };

  createStopUI();
  createRefreshButton();
  const container = createInitialContainer(width, height);
  document.body.appendChild(container);
  setInterval(update, 100);
}
