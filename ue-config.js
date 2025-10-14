window.hlx.ue = {
    init: (async () => {
      const [
        { init: initUE },
        { getConfigValue },
        { loadBlock, decorateIcons },
        { default: initDropins },
      ] = await Promise.all([
        import('/scripts/aem.js'),
        import('/scripts/__dropins__/tools/lib/aem/configs.js'),
        import('/scripts/scripts.js'),
        import('/scripts/initializers/index.js'),
      ]);
      const hlxConfig = await getConfigValue('hlx');
      const ueConfig = await getConfigValue('universal-editor');
      initDropins(ueConfig);
      return initUE(hlxConfig, ueConfig, loadBlock, decorateIcons);
    })(),
  };
  