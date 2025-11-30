class listac {
  constructor(listElement) {
    this._listEl = listElement;
    this._items = [];
  }

  add(text) {
    if (!text || !text.trim()) return;
    const item = { id: Date.now().toString(36), text: text.trim(), done: false };
    this._items.unshift(item);
    this.render();
  }

  toggle(id) {
    this._items = this._items.map(it => it.id === id ? { ...it, done: !it.done } : it);
    this.render();
  }

  remove(id) {
    this._items = this._items.filter(it => it.id !== id);
    this.render();
  }

  clearAll() {
    this._items = [];
    this.render();
  }

  render() {
    this._listEl.innerHTML = '';

    if (this._items.length === 0) {
      this._listEl.innerHTML = '<li class="todoitem">Nenhuma tarefa adicionada.</li>';
      return;
    }
    for (const it of this._items) {
      const li = document.createElement('li');
      li.className = 'todoitem' + (it.done ? ' done' : '');

      const left = document.createElement('div');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = it.done;
      checkbox.addEventListener('change', () => this.toggle(it.id));
      const title = document.createElement('span');
      title.className = 'title';
      title.textContent = it.text;

      left.appendChild(checkbox);
      left.appendChild(title);

      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'remover';
      removeBtn.className = 'secundario';
      removeBtn.addEventListener('click', () => this.remove(it.id));

      li.appendChild(left);
      li.appendChild(removeBtn);
      this._listEl.appendChild(li);
    }
  }
}
const listEl = document.getElementById('list');
const app = new listac(listEl);

const input = document.getElementById('newTodo');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
addBtn.addEventListener('click', () => {
  app.add(input.value);
  input.value = '';
  input.focus();
});

input.addEventListener('teclaclicada', e => {
  if (e.key === 'Enter') addBtn.click();
});

clearBtn.addEventListener('click', () => app.clearAll());
app.add('Entregar o trabalho do jordane');