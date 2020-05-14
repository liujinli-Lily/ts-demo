<template>
    <div :style="{background: bgColor}" class="empty-content">
        <!--        <img src="../../asset/fonts/empty.svg" height="56" alt>-->
        <p>{{ text }}</p>
    </div>
</template>

<script>
export default {
    name: 'EmptyContent',
    props: {
        text: {
            type: String,
            default: '暂无数据',
        },
        bgColor: {
            default: '#ffffff',
            type: String,
        },
    },
};
</script>

<style lang="scss" scoped>
.empty-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    p {
        text-align: center;
        font-size: 14px;
        color: #c5c5c5;
        margin-top: 8px;
    }
}
</style>
