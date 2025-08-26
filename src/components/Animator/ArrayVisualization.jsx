export function ArrayVisualization({
  array,
  arrayName,
  title,
  pointers = {},
  comparing = [],
  highlighting = [],
  elementRefs,
  customStyles,
  renderElement // 新增的renderElement属性
}) {
  const getPointerColor = (pointerName) => {
    switch (pointerName) {
      case 'slow': return 'text-green-600';
      case 'fast': return 'text-blue-600';
      case 'i': return 'text-blue-600';
      case 'j': return 'text-red-600';
      case 'k': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const ArrayElement = ({ value, index }) => {
    // 如果提供了renderElement函数，使用自定义渲染
    if (renderElement) {
      const customElement = renderElement(value, index);
      
      // 为自定义元素添加指针和索引
      return (
        <div className="relative">
          {customElement}
          
          {/* 指针标识 */}
          {Object.entries(pointers)
            .filter(([_, pos]) => pos === index)
            .map(([name]) => name).length > 0 && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold">
              {Object.entries(pointers)
                .filter(([_, pos]) => pos === index)
                .map(([name]) => name).length === 1 ? (
                // 单个指针的情况
                <span className={getPointerColor(Object.entries(pointers)
                  .filter(([_, pos]) => pos === index)
                  .map(([name]) => name)[0])}>
                  ↓ {Object.entries(pointers)
                    .filter(([_, pos]) => pos === index)
                    .map(([name]) => name)[0]}
                </span>
              ) : (
                // 多个指针重叠的情况 - 水平排列
                <div className="flex flex-row items-center space-x-1">
                  {Object.entries(pointers)
                    .filter(([_, pos]) => pos === index)
                    .map(([name]) => name).map((pointerName, idx) => (
                    <span key={idx} className={getPointerColor(pointerName)}>
                      ↓ {pointerName}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 索引 */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
            {index}
          </div>
        </div>
      );
    }

    // 默认渲染逻辑（保持原有功能）
    const isComparing = comparing.includes(`${arrayName}-${index}`);
    const isHighlighting = highlighting.includes(`${arrayName}-${index}`);
    const pointerTypes = Object.entries(pointers)
      .filter(([_, pos]) => pos === index)
      .map(([name]) => name);

    let className = 'w-12 h-12 flex items-center justify-center border-2 rounded-lg font-bold transition-all duration-300 ';

    const customStyle = customStyles ? customStyles(index, value) : '';
    
    if (customStyle) {
      className += customStyle + ' ';
    } else if (value === 0 || value === null || value === undefined) {
      className += 'border-dashed border-gray-300 bg-gray-50 text-gray-400 ';
    } else if (isComparing) {
      className += 'border-yellow-500 bg-yellow-100 text-yellow-800 scale-110 animate-pulse ';
    } else if (isHighlighting) {
      className += 'border-green-500 bg-green-100 text-green-800 scale-105 ';
    } else {
      className += 'border-blue-400 bg-blue-50 text-blue-800 ';
    }

    return (
      <div className="relative">
        <div
          ref={el => elementRefs && (elementRefs.current[`${arrayName}-${index}`] = el)}
          className={className}
        >
          {value === 0 || value === null || value === undefined ? '0' : value}
        </div>

        {/* 指针标识 */}
        {pointerTypes.length > 0 && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold">
            {pointerTypes.length === 1 ? (
              // 单个指针的情况
              <span className={getPointerColor(pointerTypes[0])}>
                ↓ {pointerTypes[0]}
              </span>
            ) : (
              // 多个指针重叠的情况 - 水平排列
              <div className="flex flex-row items-center space-x-1">
                {pointerTypes.map((pointerName, idx) => (
                  <span key={idx} className={getPointerColor(pointerName)}>
                    ↓ {pointerName}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 索引 */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
          {index}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h4 className="text-md font-semibold mb-4 text-gray-800">{title}</h4>
      <div className="flex space-x-2 justify-center">
        {array.map((value, index) => (
          <ArrayElement key={index} value={value} index={index} />
        ))}
      </div>
    </div>
  );
}