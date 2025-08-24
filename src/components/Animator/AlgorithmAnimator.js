export class AlgorithmAnimator {
  constructor(initialState, options = {}) {
    this.state = { ...initialState };
    this.listeners = [];
    this.isRunning = false;
    this.isPaused = false;
    this.speed = options.speed || 1000;
    this.timeoutRef = null;
    this.animationQueue = [];
    this.isProcessing = false;
  }

  // 订阅状态变化
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // 通知状态变化
  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  // 更新状态
  setState(updates) {
    this.state = { ...this.state, ...updates };
    this.notify();
  }

  // 添加动画到队列
  enqueue(type, params) {
    this.animationQueue.push({ type, params, id: Date.now() + Math.random() });
    if (!this.isProcessing && this.isRunning) {
      this.processQueue();
    }
  }

  // 处理动画队列
  async processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (this.animationQueue.length > 0 && this.isRunning) {
      // 等待暂停状态结束
      while (this.isPaused) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      const animation = this.animationQueue.shift();
      await this.executeAnimation(animation);
    }

    this.isProcessing = false;
    
    // 如果队列为空且算法还在运行，说明算法执行完成
    if (this.animationQueue.length === 0 && this.isRunning) {
      this.setState({ isComplete: true, currentAction: '🎉 算法执行完成！' });
      this.isRunning = false;
      this.setState({ isRunning: false });
    }
  }

  // 执行单个动画
  async executeAnimation(animation) {
    const { type, params } = animation;

    switch (type) {
      case 'setAction':
        this.setState({ currentAction: params.description });
        break;

      case 'delay':
        await new Promise(resolve => {
          this.timeoutRef = setTimeout(resolve, params.ms || this.speed);
        });
        break;

      case 'highlight':
        this.setState({ highlighting: params.elements });
        await new Promise(resolve => {
          this.timeoutRef = setTimeout(resolve, params.duration || 600);
        });
        this.setState({ highlighting: null });
        break;

      case 'compare':
        this.setState({
          comparing: [params.element1, params.element2],
          currentAction: params.description
        });
        await new Promise(resolve => {
          this.timeoutRef = setTimeout(resolve, this.speed);
        });
        this.setState({ comparing: null });
        break;

      case 'move':
        this.setState({
          moving: { value: params.value, from: params.from, to: params.to },
          currentAction: params.description
        });
        await new Promise(resolve => {
          this.timeoutRef = setTimeout(resolve, 800);
        });
        this.setState({ moving: null });
        break;

      case 'updateArray':
        const newArray = [...this.state[params.arrayName]];
        newArray[params.index] = params.value;
        this.setState({ [params.arrayName]: newArray });
        break;

      case 'updatePointer':
        this.setState({ [params.pointerName]: params.value });
        break;

      default:
        console.warn('未知的动画类型:', type);
    }
  }

  setAction(description) {
    this.enqueue('setAction', { description });
  }

  delay(ms = this.speed) {
    this.enqueue('delay', { ms });
  }

  highlight(elements, duration = 600) {
    this.enqueue('highlight', { elements, duration });
  }

  compare(element1, element2, description) {
    this.enqueue('compare', { element1, element2, description });
  }

  move(value, from, to, description) {
    this.enqueue('move', { value, from, to, description });
  }

  updateArray(arrayName, index, value) {
    this.enqueue('updateArray', { arrayName, index, value });
  }

  updatePointer(pointerName, value) {
    this.enqueue('updatePointer', { pointerName, value });
  }

  // 开始执行 - 现在算法函数是同步的
  start(algorithmFunction) {
    this.isRunning = true;
    this.setState({ isRunning: true, isComplete: false });
    this.animationQueue = []; // 清空队列

    try {
      // 算法函数现在是同步的，只是添加动画到队列
      algorithmFunction(this);
      // 开始处理队列
      this.processQueue();
    } catch (error) {
      console.error('算法执行错误:', error);
      this.isRunning = false;
      this.setState({ isRunning: false });
    }
  }

  // 暂停
  pause() {
    this.isPaused = true;
    this.setState({ isPaused: true });
  }

  // 继续
  resume() {
    this.isPaused = false;
    this.setState({ isPaused: false });
  }

  // 重置
  reset(initialState) {
    if (this.timeoutRef) {
      clearTimeout(this.timeoutRef);
    }
    this.isRunning = false;
    this.isPaused = false;
    this.isProcessing = false;
    this.animationQueue = [];
    this.state = { ...initialState };
    this.setState({
      isRunning: false,
      isPaused: false,
      isComplete: false,
      currentAction: '',
      comparing: null,
      moving: null,
      highlighting: null
    });
  }

  // 设置速度
  setSpeed(speed) {
    this.speed = speed;
  }

  // 获取队列状态（调试用）
  getQueueInfo() {
    return {
      length: this.animationQueue.length,
      isProcessing: this.isProcessing,
      nextAnimation: this.animationQueue[0] || null
    };
  }
}